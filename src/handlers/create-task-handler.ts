import { Request, Response } from 'express'
import { taskCreateDb } from '../utils/db-queries'

export const createTaskHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.body
    const userId = req.user.id

    if (!title || title.trim() == '') {
      res.status(400).json({ message: 'Task title is required' })
      return
    }
    if (!userId) {
      res.status(400).json({ message: 'User id is required' })
      return
    }

    const taskId = await taskCreateDb({ userId, title })

    res.status(201).json({
      task: { userId: userId, id: taskId, title: title },
    })
    return
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
