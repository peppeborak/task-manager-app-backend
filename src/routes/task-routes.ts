import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticate-token'
import { getAllTasksHandler } from '../handlers/get-all-tasks-handler'
import { searchTaskHandler } from '../handlers/search-task-handler'
import { createTaskHandler } from '../handlers/create-task-handler'
import { getTaskHandler } from '../handlers/get-task-handler'
import { updateTaskHandler } from '../handlers/update-task-handler'
import { deleteTaskHandler } from '../handlers/delete-task-handler'


export function tasksRoutes() {
  const router = Router()

  router.get('/', authenticateToken, getAllTasksHandler)
  router.get('/search', authenticateToken, searchTaskHandler)
  router.post('/', authenticateToken, createTaskHandler)
  router.get('/:id', authenticateToken, getTaskHandler)
  router.put('/:id', authenticateToken, updateTaskHandler)
  router.delete('/:id', authenticateToken, deleteTaskHandler)

  return router
}
