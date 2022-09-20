import { Request, Response, Router } from 'express'
import { SimpleResponse } from '../models/simple-response';
import { objectService } from "../services/object-service";


const objectController = Router()

objectController.post('/', async (req: Request, res: Response) => {
  var response = await objectService.createObject(req.body)

  if (response instanceof SimpleResponse) return res.status(201).json(response)
  else return res.status(response.status).json(response)
})

export default objectController
