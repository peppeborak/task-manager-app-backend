import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise'

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