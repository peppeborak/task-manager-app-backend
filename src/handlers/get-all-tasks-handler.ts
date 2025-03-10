import { Request, Response } from 'express'
import { getAllTasksFromDb } from '../utils/db-queries'

export const getAllTasksHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id

    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }

    const tasks = await getAllTasksFromDb({ userId })

    res.status(200).json(tasks)
    return
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
