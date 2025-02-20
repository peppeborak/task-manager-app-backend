import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import express, { Express } from 'express'
import { getTasksHandler } from './handlers/get-tasks-handler'
import { signupHandler } from './handlers/signup-handler'



const app: Express = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/api/v1/signup', signupHandler)

app.get('/api/v1/tasks', getTasksHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
