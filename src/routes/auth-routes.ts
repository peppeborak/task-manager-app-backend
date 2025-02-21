import { Router } from 'express'
import { signupHandler } from '../handlers/signup-handler'
import { loginHandler } from '../handlers/login-handler'


export function authRoutes() {
  const router = Router()

  router.post('/signup', signupHandler)
  router.post('/login', loginHandler)

  return router
}
