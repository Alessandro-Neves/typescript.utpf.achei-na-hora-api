import { Router } from 'express'

import loginController from './login-controller'
import userController from './user-controller'

const routes = Router()

routes.use('/login', loginController)
routes.use('/user', userController)

export default routes
