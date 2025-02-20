// src/index.ts
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { getTasksHandler } from './handlers/get-tasks-handler'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.get('/api/v1/tasks', getTasksHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
