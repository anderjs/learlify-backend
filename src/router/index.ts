import { Router, type Router as ExpressRouter } from 'express'
import type { HttpConsumer } from '@types'
import { Logger } from 'api/logger'

type ApplicationInterfaceConfig = {
  controllers?: HttpConsumer[]
}

export class ApplicationInterfaceService {
  controllers: HttpConsumer[]
  logger: typeof Logger.Service

  constructor({ controllers }: ApplicationInterfaceConfig) {
    this.controllers = controllers || []
    this.logger = Logger.Service
  }

  applyRouterManagement(): ExpressRouter {
    const router = Router()

    this.logger.info('Settings for controllers')

    this.controllers.forEach(({ route, handlers }) => {
      router.use(route, handlers)
    })

    return router
  }
}
