export interface RoleRecord {
  id: number
  name: string
}

export declare class RolesService {
  findOne(query: { id?: number; name?: string }): Promise<RoleRecord>
  getAll(): Promise<RoleRecord[]>
}
