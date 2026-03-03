import { Model } from 'objection'

declare class User extends Model {
  id: number
  email: string
  password?: string
  firstName: string
  lastName: string
  roleId?: number
  modelId?: number
  imageUrl?: string
  isVerified?: boolean
  lang?: string
  lastLogin?: string
  stripeCustomerId?: string
  googleId?: string
  facebookId?: string
  tour?: boolean
  createdAt?: string
  updatedAt?: string
  role?: { id: number; name: string }
  model?: { id: number; name: string }
}

export default User
