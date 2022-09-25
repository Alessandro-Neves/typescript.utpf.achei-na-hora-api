import { Prisma } from "..";
import { Image } from "@prisma/client";


class ImageRepository {
   public async createImage(source: string): Promise<Image> {
      return await Prisma.image.create({
         data: {
            source
         }
      })
   }

   public async findImage(id: number): Promise<Image | undefined> {
      return await Prisma.image.findFirst({
         where: { id }
      }) ?? undefined
   }
}

export const imageRepository = new ImageRepository() 