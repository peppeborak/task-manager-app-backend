import supertest from 'supertest'
import { app } from '../server'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    deleteTaskFromDb: jest.fn().mockReturnValue(1),
  }
})

describe('DELETE api/v1/tasks/id', () => {
  it('should return 200 and success message', async () => {
    const response = await supertest(app).delete('/api/v1/tasks/1').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ message: 'Successfully deleted task' })
  })
  it('should return 400 if taskId is a negative number', async () => {
    const response = await supertest(app).delete('/api/v1/tasks/-1').send()

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Invalid task id' })
  })
  it('should return 400 if taskId is not a number', async () => {
    const response = await supertest(app).delete('/api/v1/tasks/abc').send()

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Invalid task id' })
  })
  it('should return 404 if task does not exist', async () => {
    jest
      .spyOn(dbQueries, 'deleteTaskFromDb')
      .mockReturnValueOnce(Promise.resolve(0))

    const response = await supertest(app).delete('/api/v1/tasks/1').send()

    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({ message: 'Task does not exist' })
  })
  it('should return 500 if db query fails', async () => {
    jest
      .spyOn(dbQueries, 'deleteTaskFromDb')
      .mockRejectedValueOnce(new Error('DB Error'))

    const response = await supertest(app).delete('/api/v1/tasks/1').send()

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
