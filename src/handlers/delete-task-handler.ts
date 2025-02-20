import { Request, Response } from 'express'
import { taskDeleteDb } from '../utils/db-queries'

export const deleteTaskHandler = async (
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
    if (!taskId || taskId <= 0) {
      res.status(400).json({ message: 'Invalid task id' })
      return
    }

    const rowsDeleted = await taskDeleteDb({ userId, taskId })
    if (rowsDeleted === 0) {
      // could be invalid userId aswell but highly unlikely
      res.status(404).json({ message: 'Task does not exist' })
      return
    }

    res.status(200).json({ message: 'Successfully deleted task' })
    return
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
