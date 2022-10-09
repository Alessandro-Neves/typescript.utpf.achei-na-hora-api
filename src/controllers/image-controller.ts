import path from 'path'

import { ImageUse } from '@prisma/client';
import { Router, Request, Response } from 'express'

import { imageRepository } from '../database/repositories/image-repository';
import { uploadManipulator } from '../middleware/upload/upload-manipulator';
import { BadRequestException, HttpExceptionHandler, NotFoundException, UnsupportedMediaTypeException } from '../models/exception-http';


const imageController: Router = Router()

const allowedExtensions = ['png', 'jpg']
imageController.post('/image', uploadManipulator.asMiddleware('image', 'files/images', allowedExtensions), async (req: Request, res: Response) => {
   try {
      if (!req.files) throw new BadRequestException('no files available for download')
      
      if (!req.files.length) throw new UnsupportedMediaTypeException()
      
      var fileInfos = (req.files as any[]).map((file: any) => { return { name: file.originalname, path: file.path } as { name: string, path: string } })

      var persistedFiles: ({ id: number, source: string, originalName: string, type: string })[] = []

      for (let file of fileInfos) {
         var image = await imageRepository.createImage(file.path, ImageUse.GENERAL)
         persistedFiles.push({
            id: image.id,
            source: '/image/' + image.id,
            originalName: file.name,
            type: image.use?.toString() ?? 'NOT'
         })
      }

      return res.status(201).json(persistedFiles)
   } catch (err) { HttpExceptionHandler(res, err) }
})

imageController.get('/image/:imageId', async (req: Request, res: Response) => {
   try {
      const image = await imageRepository.findImage(Number(req.params.imageId))

      if (!image) throw new NotFoundException('image not found')

      const dirname = path.resolve()
      const absoluteFilePath = path.join(dirname, image.source)
      return res.sendFile(absoluteFilePath)

   } catch (err) { HttpExceptionHandler(res, err) }
})

imageController.get('/image', async (req: Request, res: Response) => {
   try {
      const images = await imageRepository.findAllImages()

      var response = images.map(img => {
         return {
            src: '/image/' + img.id,
            type: img.use
         }
      })

      return res.status(200).json(response)

   } catch (err) { HttpExceptionHandler(res, err) }
})

imageController.get('/up', (req: Request, res: Response) => {
   try {
      res.sendFile(path.join(path.resolve(), 'static/admin-upload.html'))
   } catch (err) { HttpExceptionHandler(res, err) }
})


export default imageController

