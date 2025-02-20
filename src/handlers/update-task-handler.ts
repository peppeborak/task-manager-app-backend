import { Request, Response } from 'express'
import { updateTaskToDb } from '../utils/db-queries'

export const updateTaskHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = +req.params.id
    const { updatedTitle } = req.body
    const userId = req.user.id

    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }
    if (!updatedTitle || updatedTitle.trim() === '') {
      res.status(400).json({ message: 'Task title is required' })
      return
    }

    const rowsAffected = await updateTaskToDb({ updatedTitle, userId, taskId })
    if (rowsAffected === 0) {
      res.status(404).json({ message: 'Task not found' })
      return
    }

    res.status(200).json({
      updatedTitle: updatedTitle,
    })
    return
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
