import { Router, Request, Response } from 'express'

import multer from 'multer';
import path from 'path'
import { uploadManipulator } from '../middleware/upload/upload-manipulator';

import ExceptionHttpResponse from '../models/exception-http';

export const filesController: Router = Router()

// const uploadMiddleware = multer(uploadManipulator.getConfig).single('avatar')

// uploadController.post('/', uploadMiddleware, (req: Request, res: Response) => {
//   if (req.file) return res.json({ response: req.file });
//   return res.status(409).json({ msg: `Não é um tipo de arquivo válido` })
// })


// const multerMiddleware = multer({ dest: 'files/' })

// const multerMiddleware = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'files/'),
//     filename: (req, file, cb) => cb(null, `${new Date().valueOf()}_${file.originalname}`)
//   })
// })

const allowedExtensions = ['png', 'jpg']

filesController.post('/', uploadManipulator.asMiddleware('image', 'files/', allowedExtensions), function (req, res, next) {
  if(!req.files) return res.status(409).json(new ExceptionHttpResponse(400, 'Nenhum arquivo disponibilizado para upload !'))
  if(!req.files.length) return res.status(415).json(new ExceptionHttpResponse(415, 'Formato de arquivo inválido !'))
  var fileInfos = (req.files as any[]).map((file: any) => { return {name: file.filename, path: file.path} as {name: string, path: string}} )
  return res.status(201).json({message: 'uploaded!', file: fileInfos})
})

filesController.get('/:nameAndExtension', (req: Request, res: Response) => {
  const dirname = path.resolve()
  const absoluteFilePath = path.join(dirname, 'files/'+req.params.nameAndExtension)
  return res.sendFile(absoluteFilePath)
})

filesController.get('/', (req: Request, res: Response) => res.sendFile(path.join(path.resolve(), 'static/admin-upload.html')))

