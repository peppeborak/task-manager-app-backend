import { Request, Response } from 'express'
import { searchTaskFromDb } from '../utils/db-queries'

export const searchTaskHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id
    const searchTerm = req.query.title as string

    if (!searchTerm || searchTerm.trim() === '') {
      res.status(400).json({ message: 'Search term is required' })
      return
    }

    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }

    const tasks = await searchTaskFromDb({ userId, searchTerm })


    res.status(200).json({ tasks })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
