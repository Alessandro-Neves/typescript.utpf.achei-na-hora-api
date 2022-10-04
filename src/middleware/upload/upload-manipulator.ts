import multer from "multer"
import { v4 as uuidV4} from 'uuid'
import fs from 'fs'

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

   public getConfig(destPath: string, allowedExtensions: string[]): multer.Options {
      return {
         storage: this.storage(destPath),
         fileFilter: this.filter(allowedExtensions)
      }
   }

   /**
   *  @returns Instância do multer configurada como um middleware.
   *  @param target nome da propriedade na form que conterá os arquivos na request.
   */
   public asMiddleware(target: string, path: string, allowedExtensions: string[]) {
      return multer(this.getConfig(path, allowedExtensions)).array(target)
   }

}

export const uploadManipulator = new UploadManipulator()

