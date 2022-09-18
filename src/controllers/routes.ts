import { Router } from 'express'

import authController from './auth-controller'
import userController from './user-controller'

const routes = Router()

routes.use('/auth', authController)
routes.use('/user', userController)

export default routes
