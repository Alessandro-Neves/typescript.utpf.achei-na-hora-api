import { Request, Response, Router } from 'express'
import ExceptionHttpResponse from '../models/exception-http'
import { SimpleResponse } from '../models/simple-response'
import { UserCreateRequestDTO } from '../models/user-dtos'
import AuthService from '../services/auth-service'
import UserService from '../services/user-service'

const userController = Router()

userController.post('/', async (req: Request, res: Response) => {
   var response = await UserService.createUser(req.body)

   if (response instanceof SimpleResponse) return res.status(201).json(response)
   else return res.status(response.status).json(response)
})

export default userController