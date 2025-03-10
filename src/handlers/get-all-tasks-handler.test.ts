import { app } from '../server'
import supertest from 'supertest'
import * as dbQueries from '../utils/db-queries'


const mockedDbResponse = [
  {
    id: 1,
    userId: 1,
    title: 'test1',
    priority: 'medium',
    category: null,
    created_at: '2025-03-10T09:56:19.000Z',
    isCompleted: 0,
    isDeleted: 0,
  },
  {
    id: 2,
    userId: 1,
    title: 'test2',
    priority: 'medium',
    category: null,
    created_at: '2025-03-10T14:28:29.000Z',
    isCompleted: 1,
    isDeleted: 0,
  },
]

jest.mock('../utils/db-queries', () => ({
  getAllTasksFromDb: jest.fn(() => Promise.resolve(mockedDbResponse)),
}))

describe('GET api/v1/tasks', () => {
  it('should return 200 and all tasks', async () => {
    const response = await supertest(app).get('/api/v1/tasks').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(mockedDbResponse)
  })

  it('should return 500 if DB query fails', async () => {
    jest
      .spyOn(dbQueries, 'getAllTasksFromDb')
      .mockRejectedValueOnce(new Error('DB Error'))

    const response = await supertest(app).get('/api/v1/tasks')

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
