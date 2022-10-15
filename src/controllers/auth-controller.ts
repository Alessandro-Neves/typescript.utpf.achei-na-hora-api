import { Request, Response,  Router } from 'express'
import { HttpExceptionHandler } from '../models/exception-http'
import { authService } from '../services/auth-service'

const authController = Router()

authController.post('/login', async (req: Request, res: Response) => {
  try {
    var response = await authService.login(req.body)
    res.status(200).json(response)
  } catch (err) { HttpExceptionHandler(res, err) }
})

authController.post('/me', async (req: Request, res: Response) => {
  try {
    await authService.auth(req.body)
    res.send(200)
  } catch (err) { HttpExceptionHandler(res, err) }
})

export default authController