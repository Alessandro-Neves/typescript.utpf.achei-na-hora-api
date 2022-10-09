import multer from "multer"
import { v4 as uuidV4} from 'uuid'
import fs from 'fs'
import { NextFunction, Request, Response } from "express"

import { PayloadTooLargeException, BadRequestException, InternalServerErrorException, HttpException } from '../../models/exception-http'

function getExtensionFile(fileName: string): string {
   const splittedName = fileName.split('.')
   return splittedName[splittedName.length - 1]
}

function verifyExtensionFile(fileName: string, extensions: string[]): boolean {
   var fileNameIsOneOfTheExtensions = false

   for(let extension of extensions)
      if(getExtensionFile(fileName) === extension) fileNameIsOneOfTheExtensions = true
   
   return fileNameIsOneOfTheExtensions
}

class UploadManipulator {

   private storage(destPath: string): multer.StorageEngine {
      return multer.diskStorage({
         destination: (req, file, cb) => {
            if (!fs.existsSync(destPath)) {
               fs.mkdirSync(destPath);
            }
            cb(null, destPath)
         },
         filename: (req, file, cb) => cb(null, `${uuidV4()}.${getExtensionFile(file.originalname)}`),
      })
   }

   private filter(allowedExtensions: string[]): (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => void {
      return (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
         const allowedExtension = verifyExtensionFile(file.originalname, allowedExtensions)
         cb(null, allowedExtension)
      }
   }

   public getConfig(destPath: string, allowedExtensions: string[], maxSizeFile: number): multer.Options {
      return {
         storage: this.storage(destPath),
         fileFilter: this.filter(allowedExtensions),
         limits: {
          fileSize: maxSizeFile
         }
      }
   }

   /**
   *  @returns Multer instance configured as a middleware
   *  @param target property name in the form-data that will contain the files to persist.
   */
   public asMiddleware(target: string, path: string, allowedExtensions: string[], maxSizeFile: number = 5242880) {
      var instanceMulter = multer(this.getConfig(path, allowedExtensions, maxSizeFile)).array(target)

      return (req: Request, res: Response, next: NextFunction) => {
        instanceMulter(req, res, (error: any) => {
          try {
            if(error instanceof multer.MulterError){
              if(error.message === 'File too large')
                throw new PayloadTooLargeException()
              throw new BadRequestException(error.message)
            }else if(error)
              throw new InternalServerErrorException()
            
          } catch (err) {
            if(err instanceof HttpException)
              return res.status(err.statusCode).json(err)
            return res.status(500).json(new InternalServerErrorException())
          }
          next()
        })
      } 
   }

}

export const uploadManipulator = new UploadManipulator()