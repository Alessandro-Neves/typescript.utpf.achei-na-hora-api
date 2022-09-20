import { Object_type, Object } from "@prisma/client";
import { Prisma } from "..";

class ObjectRepository {
  public async createObject(
    title: string, 
    description: string,
    location: string,
    type: Object_type,
    tag: string,
    image: any,
    ownerId?: number,
    discovererId?: number
  ): Promise<Object> {
    return await Prisma.object.create({
      data: {
        title,
        description,
        location,
        type,
        tag,
        image,
        updated_at: new Date(),
      }
    })
  }
}


export const objectRepository = new ObjectRepository()