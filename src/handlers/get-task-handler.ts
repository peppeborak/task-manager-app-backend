import { Request, Response } from 'express'
import { getTaskFromDb } from '../utils/db-queries'

export const getTaskHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = +req.params.id
    const userId = req.user.id

    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }

    if (isNaN(taskId) || taskId <= 0) {
      res.status(400).json({ message: 'Invalid task id' })
      return
    }

    const task = await getTaskFromDb({ userId, taskId })

    if (task.length === 0) {
      res.status(404).json({ message: 'Task not found' })
      return
    }

    res.status(200).json({ task })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
