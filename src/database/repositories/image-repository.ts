import { Prisma } from "..";
import { Image, Image_use } from "@prisma/client";


class ImageRepository {
   public async createImage(source: string, type: Image_use): Promise<Image> {
      return await Prisma.image.create({
         data: {
            source,
            use: type
         }
      })
   }

   public async findImage(id: number): Promise<Image | undefined> {
      return await Prisma.image.findFirst({
         where: { id }
      }) ?? undefined
   }

   public async findAllImages(): Promise<Image[]> {
      return await Prisma.image.findMany() ?? []
   }
}

export const imageRepository = new ImageRepository() 