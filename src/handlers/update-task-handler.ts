import { Request, Response } from 'express'
import { getTaskFromDb, updateTaskToDb } from '../utils/db-queries'

export const updateTaskHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = +req.params.id
    const { updatedTitle, priority, category, status } = req.body
    const userId = req.user.id

    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }
    if (updatedTitle && updatedTitle.trim() === '') {
      res.status(400).json({ message: 'Invalid title' })
      return
    }
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      res.status(400).json({
        message:
          'Invalid priority value. It should be "low", "medium", or "high"',
      })
      return
    }
    if (category && category.trim() === '') {
      res.status(400).json({ message: 'Invalid category' })
      return
    }
    if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
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
      priority: priority || currentTask.priority,
      category: category || currentTask.category,
      status: status || currentTask.status,
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
