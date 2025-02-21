import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Express } from 'express'
import { authenticateToken } from './middlewares/authenticate-token'
import { tasksRoutes } from './routes/task-routes'
import { authRoutes } from './routes/auth-routes'

export const app: Express = express()
const port = process.env.PORT || 3000


app.use(cors())
app.use(bodyParser.json())


app.use('/api/v1/auth', authRoutes())
app.use('/api/v1/tasks', authenticateToken, tasksRoutes())

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
