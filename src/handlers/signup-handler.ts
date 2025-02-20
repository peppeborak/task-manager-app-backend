import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUserDb } from '../utils/db-queries'

export const signupHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body

    if (!username || username.trim() === '') {
      res.status(400).json({ message: 'Email is required' })
      return
    }
    if (!password || password.trim() === '') {
      res.status(400).json({ message: 'Password is required' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = await createUserDb({ username, hashedPassword })

    res.status(201).json(userId)
    return
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
