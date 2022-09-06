import { Request, Response,  Router } from 'express'
import { LoginResponseDTO } from '../models/login-dtos'
import AuthService from '../services/auth'

const loginController = Router()

loginController.post('/', (req: Request, res: Response) => {
  var [status, response] = AuthService.login(req.body)
  return res.status(status).json(response)
})

export default loginController