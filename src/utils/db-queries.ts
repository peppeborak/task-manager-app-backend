import mysql, { ResultSetHeader } from 'mysql2/promise'
import {
  CreateUserInput,
  GetUserInput,
  TaskCreateInput,
  TaskDeleteInput,
  UserRowDataPacket,
} from './types'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

export const createUserDb = async ({
  username,
  hashedPassword,
}: CreateUserInput): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  )
  return result.insertId
}

export const getUserDb = async ({
  username,
}: GetUserInput): Promise<UserRowDataPacket> => {
  const [rows] = await pool.query<UserRowDataPacket[]>(
    'SELECT id, username, password FROM users WHERE username = ?',
    [username]
  )
  return rows[0]
}

export const taskCreateDb = async ({
  userId,
  title,
}: TaskCreateInput): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO tasks (userId, title) VALUES (?, ?)',
    [userId, title]
  )
  return result.insertId
}

export const taskDeleteDb = async ({
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

