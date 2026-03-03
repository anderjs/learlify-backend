interface AuthUser {
  id: number
  email: string
  roleId: number
  role: string
  isVerified: boolean
  firstName: string
  lastName: string
  imageUrl?: string
  model?: {
    id: number
    name: string
  }
}

declare global {
  namespace Express {
    interface User extends AuthUser {}

    interface Request {
      user?: AuthUser
      requestId?: string
      locale?: string
      timezone?: string
    }

    interface Response {
      __: (phrase: string, replacements?: Record<string, unknown>) => string
    }
  }
}

export {}
