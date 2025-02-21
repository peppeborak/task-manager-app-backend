import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import {
  CreateUserInput,
  GetUserInput,
  SearchTaskGetInput,
  Task,
  TaskCreateInput,
  TaskDeleteInput,
  TaskGetAllInput,
  TaskGetInput,
  TaskUpdateInput,
  UserRowDataPacket,
} from './types'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

export const createUserToDb = async ({
  username,
  hashedPassword,
}: CreateUserInput): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  )
  return result.insertId
}

export const getUserFromDb = async ({
  username,
}: GetUserInput): Promise<UserRowDataPacket> => {
  const [rows] = await pool.query<UserRowDataPacket[]>(
    'SELECT id, username, password FROM users WHERE username = ?',
    [username]
  )
  return rows[0]
}

export const createTaskToDb = async ({
  userId,
  title,
}: TaskCreateInput): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO tasks (userId, title) VALUES (?, ?)',
    [userId, title]
  )
  return result.insertId
}

export const deleteTaskFromDb = async ({
  userId,
  taskId,
}: TaskDeleteInput): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `
    UPDATE tasks 
    SET isDeleted = 1
    WHERE userId = ? AND id = ?`,
    [userId, taskId]
  )
  return result.affectedRows
}

export const getAllTasksFromDb = async ({
  userId,
}: TaskGetAllInput): Promise<Task[]> => {
  const [rows] = await pool.query<Task[] & RowDataPacket[]>(
    'SELECT * FROM tasks WHERE userId = ? AND isDeleted = 0',
    [userId]
  )
  return rows
}

export const getTaskFromDb = async ({
  userId,
  taskId,
}: TaskGetInput): Promise<Task> => {
  const [rows] = await pool.query<Task[] & RowDataPacket[]>(
    'SELECT * FROM tasks WHERE userId = ? AND id = ?',
    [userId, taskId]
  )
  return rows[0]
}

export const updateTaskToDb = async ({
  userId,
  taskId,
  title,
  priority,
  category,
  status,
}: TaskUpdateInput): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `
    UPDATE tasks 
    SET 
      title = ?, 
      priority = ?, 
      category = ?, 
      status = ?
    WHERE userId = ? AND id = ?`,
    [title, priority, category, status, userId, taskId]
  )
  return result.affectedRows
}

export const searchTaskFromDb = async ({
  userId,
  searchTerm,
}: SearchTaskGetInput): Promise<Task[]> => {
  const [rows] = await pool.query<Task[] & RowDataPacket[]>(
    'SELECT * FROM tasks WHERE userId = ? AND title LIKE ?',
    [userId, `${searchTerm}%`]
  )
  return rows
}
