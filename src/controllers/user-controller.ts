import { Request, Response, Router } from 'express'
import ExceptionHttpResponse from '../models/exception-http'
import { SimpleResponse } from '../models/simple-response'
import { UserCreateRequestDTO, UserResponseDto } from '../models/user-dtos'
import AuthService from '../services/auth-service'
import { userService } from '../services/user-service'

const userController = Router()

userController.post('/', async (req: Request, res: Response) => {
   var response = await userService.createUser(req.body)

   if (response instanceof SimpleResponse) return res.status(201).json(response)
   else return res.status(response.status).json(response)
})

userController.get('/:email', async (req: Request, res: Response) => {
   var response = await userService.findUserByEmail(req.params.email)

   if (response instanceof UserResponseDto) return res.status(200).json(response)
   else return res.status(response.status).json(response)
})

userController.delete('/:email', async (req: Request, res: Response) => {
   var response = await userService.deleteUserByEmail(req.params.email)

   if (response instanceof SimpleResponse) return res.status(200).json(response)
   else return res.status(response.status).json(response)
})

export default userController