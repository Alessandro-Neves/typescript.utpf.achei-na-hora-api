import { Router } from 'express'

import authController from './auth-controller'
import userController from './user-controller'
import objectController from './object-controller'
import { filesController } from './files-controller'

const routes = Router()

routes.use('/auth', authController)
routes.use('/user', userController)
routes.use('/object', objectController)
routes.use('/files', filesController)

export default routes
