import { RowDataPacket } from 'mysql2'

export type UserRowDataPacket = RowDataPacket & {
  id: number
  email: string
  password: string
}

export interface CreateUserInput {
  username: string
  hashedPassword: string
}

export interface GetUserInput {
  username: string
}

export type TaskCreateInput = {
  userId: number
  title: string
}

export interface TaskDeleteInput {
  userId: number
  taskId: number
}
