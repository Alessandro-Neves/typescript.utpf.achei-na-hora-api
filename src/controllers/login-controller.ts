import { Request, Response,  Router } from 'express'
import ExceptionHttpResponse from '../models/exception-http'
import { LoginResponseDTO } from '../models/login-dtos'
import AuthService from '../services/auth-service'

const loginController = Router()

loginController.post('/', async (req: Request, res: Response) => {
  var response = await AuthService.login(req.body)

  if(response instanceof ExceptionHttpResponse)
    return res.status(response.status).json(response)
  return res.status(202).json(response)
})

export default loginController