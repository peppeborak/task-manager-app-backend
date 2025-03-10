import supertest from 'supertest'
import { app } from '../server'
import bcrypt from 'bcrypt'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    getUserFromDb: jest
      .fn()
      .mockReturnValue({ username: 'test', password: 'test123' }),
  }
})

jest.mock('bcrypt')
const mockBcrypt = jest.mocked(bcrypt)
const hashSpy = jest
  .spyOn(mockBcrypt, 'hash')
  .mockResolvedValue('hashedpassword')
const compareSpy = jest.spyOn(mockBcrypt, 'compare').mockReturnValue(true)

const loginEndpoint = '/api/v1/auth/login'
const loginObject = { username: 'test', password: 'test123' }

describe('POST /api/v1/auth/login', () => {
  it('should return 200 and a valid token if successful login', async () => {
    const response = await supertest(app).post(loginEndpoint).send(loginObject)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should return 400 if username is missing', async () => {
    const response = await supertest(app)
      .post(loginEndpoint)
      .send({ password: 'test123' });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: 'Username is required' });
  });

  it('should return 400 if username is empty', async () => {
    const response = await supertest(app)
      .post(loginEndpoint)
      .send({ username: '', password: 'test123' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Username is required',
    })
  })

  it('should return 400 if username is whitespace only', async () => {
    const response = await supertest(app)
      .post(loginEndpoint)
      .send({ username: '     ', password: 'test' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Username is required',
    })
  })

  it('should return 400 if password is empty', async () => {
    const response = await supertest(app)
      .post(loginEndpoint)
      .send({ username: 'test', password: '' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Password is required',
    })
  })

  it('should return 400 if password is whitespace only', async () => {
    const response = await supertest(app)
      .post(loginEndpoint)
      .send({ username: 'test', password: '     ' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Password is required',
    })
  })

  it('should return 401 if wrong password', async () => {
    compareSpy.mockReturnValueOnce(false)
    const response = await supertest(app).post(loginEndpoint).send(loginObject)

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ message: 'Invalid username or password' })
  })

  it('should return 401 if the user does not exist', async () => {
    jest
      .spyOn(dbQueries, 'getUserFromDb')
      .mockReturnValueOnce(Promise.resolve(undefined as any))

    const response = await supertest(app).post(loginEndpoint).send(loginObject)

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ message: 'Invalid username or password' })
  })

  it('should return 500 if database query fails', async () => {
    jest
      .spyOn(dbQueries, 'getUserFromDb')
      .mockRejectedValueOnce(new Error('DB error'))

    const response = await supertest(app).post(loginEndpoint).send(loginObject)

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
