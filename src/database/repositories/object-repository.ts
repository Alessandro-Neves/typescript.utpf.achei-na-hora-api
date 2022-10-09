import { ObjectType, Object, ObjectStatus } from "@prisma/client";
import { Prisma } from "..";

class ObjectRepository {
  public async createObject(
    title: string, 
    description: string,
    location: string,
    type: ObjectType,
    ownerId?: number,
    discovererId?: number
  ): Promise<Object> {
    return await Prisma.object.create({
      data: {
        title,
        description,
        location,
        type,
        status: ObjectStatus.ACTIVE,
        ownerId,
        discovererId,
        updatedAt: new Date(),
      }
    })
  }

  public async findObject(id: number) {
    var response = await Prisma.object.findFirst({
      where: { id: id },
      include: { images: true }
    })

    return response ?? undefined
  }

  public async findObjectsByUserId(id: number) {
    return await Prisma.object.findMany({
      where: {
        OR: [ {ownerId: id },{ discovererId: id } ]
      },
      include: { images: true }
    }) ?? []
  }

  public async deleteObject(id: number) {
    return await Prisma.object.delete({
      where: {
        id: id
      }
    })
  }
}


export const objectRepository = new ObjectRepository()