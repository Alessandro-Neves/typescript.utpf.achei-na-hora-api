import { Request, Response,  Router } from 'express'
import ExceptionHttpResponse from '../models/exception-http'
import { LoginResponseDTO } from '../models/login-dtos'
import authService from '../services/auth-service'

const authController = Router()

authController.post('/login', async (req: Request, res: Response) => {
  var response = await authService.login(req.body)

  if(response instanceof ExceptionHttpResponse)
    return res.status(response.status).json(response)
  return res.status(202).json(response)
})

export default authController