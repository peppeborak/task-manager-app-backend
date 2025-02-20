import mysql, { ResultSetHeader } from 'mysql2/promise'
import { UserRowDataPacket } from './types'


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

export const createUserDb = async (
  username: string,
  passwordHash: string
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, passwordHash]
  )
  return result.insertId
}

export const getUserDb = async (
  username: string
): Promise<UserRowDataPacket> => {
  const [rows] = await pool.query<UserRowDataPacket[]>(
    'SELECT id, username, password FROM users WHERE username = ?',
    [username]
  )
  return rows[0]
}
