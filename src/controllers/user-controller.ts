import { Request, Response,  Router } from 'express'
import AuthService from '../services/auth-service'
import UserService from '../services/user-service'

const userController = Router()

userController.post('/', async (req: Request, res: Response) => {
  var [status, response] = await UserService.createUser(req.body)
  return res.status(status).json(response)
})

export default userController