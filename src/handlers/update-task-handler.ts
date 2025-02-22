import { Request, Response } from 'express'
import { getTaskFromDb, updateTaskToDb } from '../utils/db-queries'

export const updateTaskHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = +req.params.id
    const { updatedTitle, updatedPriority, updatedCategory, updatedStatus } =
      req.body
    const userId = req.user.id

    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }
    if (updatedTitle && updatedTitle.trim() === '') {
      res.status(400).json({ message: 'Invalid title' })
      return
    }
    if (
      updatedPriority &&
      !['low', 'medium', 'high'].includes(updatedPriority)
    ) {
      res.status(400).json({
        message:
          'Invalid priority value. It should be "low", "medium", or "high"',
      })
      return
    }
    if (updatedCategory && updatedCategory.trim() === '') {
      res.status(400).json({ message: 'Invalid category' })
      return
    }
    if (
      updatedStatus &&
      !['pending', 'in-progress', 'completed'].includes(updatedStatus)
    ) {
      res.status(400).json({
        message:
          'Invalid status value. It should be "pending", "in-progress", or "completed"',
      })
      return
    }

    const currentTask = await getTaskFromDb({ userId, taskId })
    if (!currentTask) {
      res.status(404).json({ message: 'Task not found' })
      return
    }

    const updatedTask = {
      taskId: taskId,
      userId: userId,
      title: updatedTitle || currentTask.title,
      priority: updatedPriority || currentTask.priority,
      category: updatedCategory || currentTask.category,
      status: updatedStatus || currentTask.status,
      created_at: currentTask.created_at,
      isDeleted: currentTask.isDeleted
    }

    const rowsAffected = await updateTaskToDb(updatedTask)

    if (rowsAffected === 0) {
      res.status(404).json({ message: 'Task not found' })
      return
    }

    res.status(200).json({
      updatedTask: updatedTask,
    })
    return
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
