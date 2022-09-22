import { Router, Request, Response } from 'express'
import multer from 'multer'

import { uploadManipulator } from '../middleware/upload/upload-manipulator'

export const uploadController: Router = Router()

const uploadMiddleware = multer(uploadManipulator.getConfig).single('avatar')

uploadController.post('/', uploadMiddleware, (req: Request, res: Response) => {
  console.log('Entrou na rota upload-image.')
  if (req.file) return res.json({ response: req.file });
  return res.status(409).json({ msg: `Não é um tipo de arquivo válido` })
})