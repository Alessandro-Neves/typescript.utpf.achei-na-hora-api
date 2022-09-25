import { Router, Request, Response } from 'express'

import path from 'path'
import { imageRepository } from '../database/repositories/image-repository';
import { uploadManipulator } from '../middleware/upload/upload-manipulator';

import ExceptionHttpResponse from '../models/exception-http';

export const imageController: Router = Router()

const allowedExtensions = ['png', 'jpg']

imageController.post('/', uploadManipulator.asMiddleware('image', 'files/images', allowedExtensions), async (req, res, next) => {
   if (!req.files) return res.status(409).json(new ExceptionHttpResponse(400, 'Nenhum arquivo disponibilizado para upload !'))
   if (!req.files.length) return res.status(415).json(new ExceptionHttpResponse(415, 'Formato de arquivo inválido !'))
   var fileInfos = (req.files as any[]).map((file: any) => { return { name: file.originalname, path: file.path } as { name: string, path: string } })

   var persistedFiles: ({ id: number, source: string, originalName: string })[] = []

   for (let file of fileInfos) {
      var image = await imageRepository.createImage(file.path)
      persistedFiles.push({
         id: image.id,
         source: '/image/' + image.id,
         originalName: file.name,
      })
   }

   return res.status(201).json({ message: 'Imagens persistidas !', files: persistedFiles })
})

imageController.get('/:imageId', async (req: Request, res: Response) => {

   try {
      const image = await imageRepository.findImage(Number(req.params.imageId))

      if (!image) throw new Error()

      const dirname = path.resolve()
      const absoluteFilePath = path.join(dirname, image.source)
      return res.sendFile(absoluteFilePath)

   } catch (erro) {
      return res.status(404).json(new ExceptionHttpResponse(404, 'NOT_FOUND: imagem não encontrada !'))
   }
})

imageController.get('/', (req: Request, res: Response) => res.sendFile(path.join(path.resolve(), 'static/admin-upload.html')))

