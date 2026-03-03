export interface UserRecord {
  id: number
  email: string
  firstName: string
  lastName: string
  imageUrl?: string
  isVerified: boolean
  roleId: number
  role?: string | { id: number; name: string }
  model?: { id: number; name: string }
  password?: string
  stripeCustomerId?: string
  googleId?: string
  facebookId?: string
  lang?: string
  lastLogin?: string
  createdAt?: string
  updatedAt?: string
  tour?: boolean
  [key: string]: unknown
}

export type UserQuery = Partial<UserRecord> & {
  allowPrivateData?: boolean
  identity?: boolean
  page?: number
  limit?: number
}

export declare class UsersService {
  getOne(query: UserQuery): Promise<UserRecord>
  getAll(query: UserQuery, search?: string | null): Promise<UserRecord[]>
  create(data: Partial<UserRecord>): Promise<UserRecord>
  updateOne(data: Partial<UserRecord> & { id: number }): Promise<UserRecord>
  isAvailable(query: { email: string }): Promise<UserRecord | undefined>
  deleteInactive(): Promise<number>
  verifyUnverified(): Promise<number>
  getUserTour(query: { id: number }): Promise<{ tour: boolean } | undefined>
  updateLastLogin(id: number): Promise<void>
}
