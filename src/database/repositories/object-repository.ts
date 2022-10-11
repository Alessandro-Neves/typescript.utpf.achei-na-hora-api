import { ObjectType, Object, ObjectStatus, prisma } from "@prisma/client";
import { Prisma } from "..";

class ObjectRepository {
  public async createObject(
    title: string, 
    description: string,
    location: string,
    type: ObjectType,
    tags: number[],
    ownerId?: number,
    discovererId?: number,
  ): Promise<Object> {
    var object = await Prisma.object.create({
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

    for (let tag of tags) 
      await this.addTag(object.id, tag)

    return object
  }

  public async findObject(id: number) {
    var response = await Prisma.object.findFirst({
      where: { id: id },
      include: { images: true, tags: true }
    })

    return response ?? undefined
  }

  public async findObjectsByUserId(id: number) {
    return await Prisma.object.findMany({
      where: {
        OR: [ {ownerId: id },{ discovererId: id } ]
      },
      include: { images: true, tags: true }
    }) ?? []
  }

  public async deleteObject(id: number) {
    return await Prisma.object.delete({
      where: {
        id: id
      }
    })
  }

  private async addTag(objectId: number, tagId: number) {
    await Prisma.tagsOnObjects.create({
      data: {
        objectId,
        tagId
      }
    })
  }

  public async findTag(id: number) {
    return await Prisma.tag.findFirst({
      where: { id: id}
    })
  }

  public async findObjectsByTag(id: number) {
    return await Prisma.object.findMany({
      where: {
        tags: {
          some: {
            tagId: id
          }
        }
      }
    })
  }

  public async searchOnTags(search: string) {
    return await Prisma.tag.findMany({
      where: {
        title: { search: search },
        description: { search: search }
      }
    })
  }

  public async searchOnObjects(search: string) {
    return await Prisma.object.findMany({
      where: {
        title: { search: search },
        description: { search: search },
      }
    })
  }
}


export const objectRepository = new ObjectRepository()