import { RowDataPacket } from 'mysql2'

export type Task = {
  id: number
  userId: number
  title: string
  priority: string
  category: string | null
  status: string
  created_at: string
  isDeleted: boolean
}

export type UserRowDataPacket = RowDataPacket & {
  id: number
  email: string
  password: string
}

export type CreateUserInput = {
  username: string
  hashedPassword: string
}

export type GetUserInput = {
  username: string
}

export type TaskCreateInput = {
  userId: number
  title: string
}

export type TaskDeleteInput = {
  userId: number
  taskId: number
}

export type TaskGetInput = {
  userId: number
  taskId: number
}

export type TaskUpdateInput = {
  updatedTitle: string
  userId: number
  taskId: number
}