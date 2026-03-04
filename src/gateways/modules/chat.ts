import type { Socket as SocketIO } from 'socket.io'
import { Socket } from 'modules'
import { Logger } from 'api/logger'
import {
  CHAT_MESSAGE,
  TYPING_MESSAGE,
  JOIN_CHAT_ROOM,
  FILE_ATTACH_STREAM,
  FILE_UPLOAD_STREAM
} from 'gateways/events'

type ChatPayload = {
  room: string
  message?: unknown
  [key: string]: unknown
}

export default class ChatGateway extends Socket {
  logger: typeof Logger.Service

  constructor() {
    super()
    this.logger = Logger.Service
  }

  main(): void {
    this.socket.on('connection', (socket: SocketIO) => {
      this.logger.info('ChatGateway: connected')

      socket.on(CHAT_MESSAGE, (payload: ChatPayload) => {
        this.logger.debug('Chat Message Emited: ', {
          payload: payload.message,
          room: payload.room
        })

        socket.to(payload.room).emit(CHAT_MESSAGE, payload)
      })

      socket.on(TYPING_MESSAGE, (payload: ChatPayload) => {
        this.logger.debug('Typing Message Event: ', payload)

        socket.to(payload.room).emit(TYPING_MESSAGE, payload)
      })

      socket.on(FILE_UPLOAD_STREAM, (payload: ChatPayload) => {
        this.logger.debug('Attaching File Event: ', payload)

        socket.to(payload.room).emit(FILE_ATTACH_STREAM, payload)
      })

      socket.on(JOIN_CHAT_ROOM, (payload: ChatPayload) => {
        socket.join(payload.room)
        this.logger.info('Joining to '.concat(payload.room))
        this.socket.to(payload.room).emit(JOIN_CHAT_ROOM, { ping: true })
      })
    })
  }
}
