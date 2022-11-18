import { Prisma } from "..";
import { Image, ImageUse } from "@prisma/client";


class ImageRepository {
   public async createImage(source: string, type: ImageUse, id?: number): Promise<Image> {

      var objectId: number | undefined = undefined
      var personId: number | undefined = undefined

      if(type === ImageUse.OBJECT) objectId = id
      
      /**
       * @todo caso em que imagem é uma image de Person
       */

      return await Prisma.image.create({
         data: {
            source,
            use: type,
            objectId: objectId,
            personId: personId
         }
      })
   }

   public async findImage(id: number): Promise<Image | undefined> {
      return await Prisma.image.findFirst({
         where: { id }
      }) ?? undefined
   }

   public async findAllImages() {
      return await Prisma.image.findMany() ?? []
   }

   public async deleteImage(id: number) {
      return await Prisma.image.delete({
         where: {
            id: id
         }
      })
   }
}

export const imageRepository = new ImageRepository() 