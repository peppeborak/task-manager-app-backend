import { Request, Response, NextFunction } from 'express'
import { TokenUser } from './types'
import jwt from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  interface Request {
    user: TokenUser
  }
}


export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
      res.status(401).json({ message: 'No token provided' })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenUser
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' })
    return
  }
}
