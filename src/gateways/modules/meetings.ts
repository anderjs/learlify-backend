import type { Socket as SocketIO } from 'socket.io'
import { Bind } from 'decorators'
import { Socket } from 'modules'
import { ConfigService } from 'api/config/config.service'
import { MeetingsService } from 'api/meetings/meetings.service'
import { ScheduleService } from 'api/schedule/schedule.service'
import { MEETING_STATUS } from 'gateways/events'
import { Logger } from 'api/logger'

type MeetingStatusPayload = {
  schedule: {
    id: number
  }
  room: string
}

class MeetingsGateway extends Socket {
  logger: typeof Logger.Service
  configService: ConfigService
  scheduleService: ScheduleService
  meetingsService: MeetingsService

  constructor() {
    super()
    this.logger = Logger.Service
    this.configService = new ConfigService()
    this.scheduleService = new ScheduleService()
    this.meetingsService = new MeetingsService()
  }

  @Bind
  main(): void {
    this.socket.on('connection', (socket: SocketIO) => {
      this.logger.info('MeetingsGateway: connected')

      socket.on(MEETING_STATUS, async (payload: MeetingStatusPayload) => {
        this.logger.debug('payload', payload)

        try {
          const isStream = await this.scheduleService.getOne({
            id: payload.schedule.id,
            streaming: true
          })

          if (isStream) {
            this.logger.info(
              `${payload.room} is still having a connection in the meeting.`
            )

            this.socket.to(payload.room).emit(MEETING_STATUS, {
              connected: true,
              room: payload.room
            })
          } else {
            this.logger.info(
              `${payload.room} is not having a connection anymore in the meeting.`
            )

            this.socket.to(payload.room).emit(MEETING_STATUS, {
              disconnected: true,
              room: payload.room
            })
          }
        } catch (err: unknown) {
          const error = err as {
            name?: string
            stack?: string
          }

          this.logger.error(String(error.name))
          this.logger.error(String(error.stack))
        }
      })
    })
  }
}

export default MeetingsGateway
