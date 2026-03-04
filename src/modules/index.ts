import type { Server } from 'socket.io'
import { stream } from '../index'

class Socket {
  socket: Server

  constructor() {
    this.socket = stream
  }

  main(): { args: null } | void {
    return {
      args: null
    }
  }
}

export { Socket }
