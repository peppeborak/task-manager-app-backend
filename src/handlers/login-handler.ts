import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserFromDb } from '../utils/db-queries'
import { Request, Response } from 'express'


export const loginHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body

    if (!username || username.trim() == '') {
      res.status(400).json({ message: 'Username is required' })
      return
    }
    if (!password || password.trim() == '') {
      res.status(400).json({ message: 'Password is required' })
      return
    }

    const user = await getUserFromDb({ username })

    if (!user) {
      res.status(401).json({ message: 'Invalid username or password' })
      return
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid username or password' })
      return
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '3h',
      }
    )

    res.status(200).json({ token })
    return
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
