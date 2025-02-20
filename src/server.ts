import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import express, { Express } from 'express'
import { authenticateToken } from './middlewares/authenticate-token'
import { getAllTasksHandler } from './handlers/get-all-tasks-handler'
import { signupHandler } from './handlers/signup-handler'
import { loginHandler } from './handlers/login-handler'
import { deleteTaskHandler } from './handlers/delete-task-handler'
import { createTaskHandler } from './handlers/create-task-handler'
import { getTaskHandler } from './handlers/get-task-handler'
import { updateTaskHandler } from './handlers/update-task-handler'

const app: Express = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/api/v1/signup', signupHandler)
app.post('/api/v1/login', loginHandler)

app.get('/api/v1/tasks', authenticateToken, getAllTasksHandler)
app.get('/api/v1/tasks/:id', authenticateToken, getTaskHandler)
app.post('/api/v1/tasks', authenticateToken, createTaskHandler)
app.put('/api/v1/tasks/:id', authenticateToken, updateTaskHandler)
app.delete('/api/v1/tasks/:id', authenticateToken, deleteTaskHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
