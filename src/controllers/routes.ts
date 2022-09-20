import { Router } from 'express'

import authController from './auth-controller'
import userController from './user-controller'
import objectController from './object-controller'

const routes = Router()

routes.use('/auth', authController)
routes.use('/user', userController)
routes.use('/object', objectController)

export default routes
