import { Request, Response, Router } from 'express'
import { uploadManipulator } from '../middleware/upload/upload-manipulator';
import { HttpExceptionHandler } from '../models/exception-http';
import { objectService } from "../services/object-service";

const objectController = Router()

/* create object */
objectController.post('/', async (req: Request, res: Response) => {
   try {
      var response = await objectService.createObject(req.body)
      res.status(201).json(response)
   } catch (err) { HttpExceptionHandler(res, err) }
})

/* add images to object */
const allowedExtensions = ['png', 'jpg']
objectController.post('/images/:objectId', uploadManipulator.asMiddleware('image', 'files/images', allowedExtensions), async (req: Request, res: Response) => {
   try {
      var response = await objectService.addImagesToObject(req.files as (Express.Multer.File[] | undefined), Number(req.params.objectId))
      return res.status(200).json(response)
   } catch (err) { HttpExceptionHandler(res, err) }
})

/* get object by id */
objectController.get('/:objectId', async (req: Request, res: Response) => {
  try {
    var response = await objectService.getObjectById(Number(req.params.objectId))
    res.status(200).json(await objectService.getObjectById(Number(req.params.objectId)))
  } catch (err) { HttpExceptionHandler(res, err) }
})

/* get object by user id */
objectController.get('/user/:userId', async (req: Request, res: Response) => {
   try {
      var response = await objectService.findObjectsByUserId(Number(req.params.userId))
      res.status(200).json(response)
   } catch (err) { HttpExceptionHandler(res, err) }
})

/* delete object by id */
objectController.delete('/:objectId', async (req: Request, res: Response) => {
   try {
      var response = await objectService.deleteObjectById(Number(req.params.objectId))
      res.status(200).json(response)
   } catch (err) { HttpExceptionHandler(res, err)}
})


export default objectController
