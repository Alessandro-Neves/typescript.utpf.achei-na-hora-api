import { Router } from 'express'

import loginController from './login-controller'

const routes = Router()

routes.use('/login', loginController)

export default routes
