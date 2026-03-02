import type { ConfigurationProvider } from '@types'

export declare class ConfigService {
  provider: ConfigurationProvider
  nameOptions: { min: number; max: number }
  passwordOptions: { min: number; max: number }
  getLastLogin(date?: string): string
}
