import { Prisma } from "..";
import { Image, ImageUse } from "@prisma/client";


class TagRepository {
  public async findAll() {
    return await Prisma.tag.findMany()
  }
}

export const tagRepository = new TagRepository() 