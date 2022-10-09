import { Request, Response, Router } from 'express'
import { HttpExceptionHandler } from '../models/exception-http'
import { userService } from '../services/user-service'

const userController = Router()

/* create user */
userController.post('/', async (req: Request, res: Response) => {
   try {
      var response = await userService.createUser(req.body)
      res.status(200).json(response)
   } catch (err) { HttpExceptionHandler(res, err) }
})

/* get user */
userController.get('/:email', async (req: Request, res: Response) => {
   try {
      var response = await userService.findUserByEmail(req.params.email)
      res.status(200).json(response)
   } catch (err) { HttpExceptionHandler(res, err) }
})

/* delete user */
userController.delete('/:email', async (req: Request, res: Response) => {
   try {
      var response = await userService.deleteUserByEmail(req.params.email)
      res.status(200).json(response)
   } catch (err) { HttpExceptionHandler(res, err) }
})


export default userController