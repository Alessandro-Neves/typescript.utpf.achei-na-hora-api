import { Request, Response, Router } from 'express'
import ExceptionHttpResponse from '../models/exception-http';
import { isObjectResponseDTO } from '../models/object-dtos';
import { SimpleResponse } from '../models/simple-response';
import { objectService } from "../services/object-service";


const objectController = Router()

objectController.post('/', async (req: Request, res: Response) => {
  var response = await objectService.createObject(req.body)

  if (response instanceof ExceptionHttpResponse) return res.status(response.status).json(response)
  else if(isObjectResponseDTO(response))  return res.status(200).json(response)  
  return res.status(500).json(new ExceptionHttpResponse(500, 'INTERNAL_SERVER_ERROR: create object'))
})

export default objectController
