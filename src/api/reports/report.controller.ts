import { Request, Response } from 'express'
import type { MailData } from '@sendgrid/helpers/classes/mail'
import { MailService } from 'api/mails/mails.service'
import { ConfigService } from 'api/config/config.service'
import { UsersService } from 'api/users/users.service'

class ReportController {
  private configService: ConfigService
  private mailService: MailService
  private usersService: UsersService

  constructor() {
    this.configService = new ConfigService()
    this.mailService = new MailService()
    this.usersService = new UsersService()
  }

  create = async (req: Request, res: Response) => {
    const { context, device, from, message } = req.body

    const { provider } = this.configService

    await this.mailService.sendMail({
      from: provider.SENDGRID_APTIS_EMAIL,
      to: from,
      subject: context,
      message: 'Has recibido un report en AptisGo',
      text: context,
      html: `
        <div>
          <p>
            <span style="font-weight: bold; color: #323065">
              ${message}
            </span>
            <div style="font-size: 13px; color: #716b65">
              ${device}
            </div>
          </p>
        </div>
      `
    } as MailData)

    return res.status(200).json({
      message: 'Report has been sended',
      statusCode: 200
    })
  }

  quality = async (req: Request, res: Response) => {
    const user = req.user!

    const { video, assist } = req.body

    const { provider } = this.configService

    const teacher = this.usersService.getOne({
      id: req.query.teacher as unknown as number
    }) as unknown as Record<string, string> | undefined

    await this.mailService.sendMail({
      from: provider.SENDGRID_APTIS_EMAIL,
      to: provider.SENDGRID_APTIS_ACADEMY,
      text: `El estudiante ${user.firstName} ${user.lastName} Ha calificado una vídeo llamada`,
      subject: `El estudiante ${user.firstName} Ha calificado una vídeo llamada`,
      html: `
        <div>
          La llamada se ha calificado con una puntuación de <strong>${video}</strong> puntos. <br>
          El estudiante ha calificado al profesor con una puntuación de <strong>${assist}</strong> puntos.
        </div>
      `
    })

    if (teacher?.email) {
      await this.mailService.sendMail({
        from: provider.SENDGRID_APTIS_EMAIL,
        to: teacher.email,
        text: `${user.firstName} ${user.lastName} Ha calificado una vídeo llamada`,
        subject: `El estudiante ${user.firstName} Ha calificado una vídeo llamada`,
        html: `
          <div>
            La llamada se ha calificado con una puntuación de ${video} puntos,
            El estudiante ha calificado al profesor con una puntuación de ${assist}
          </div>
        `
      })
    }

    return res.status(201).json({
      message: 'Quality report has been sended',
      statusCode: 201
    })
  }
}

export { ReportController }
