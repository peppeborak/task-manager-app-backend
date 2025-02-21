import { RowDataPacket } from 'mysql2'


export type Task = {
  id: number
  userId: number
  title: string
  priority: 'low' | 'medium' | 'high'
  category: string | null
  status: 'pending' | 'in-progress' | 'completed'
  created_at: Date
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

export type TaskGetAllInput = {
  userId: number
}

export type TaskGetInput = {
  userId: number
  taskId: number
}

export type SearchTaskGetInput = {
  userId: number
  searchTerm: string
}

export type TaskUpdateInput = {
  userId: number
  taskId: number
  title?: string
  priority?: 'low' | 'medium' | 'high'
  category?: string | null
  status?: 'pending' | 'in-progress' | 'completed'
}
