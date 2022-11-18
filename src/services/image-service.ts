import { imageRepository } from "../database/repositories/image-repository"
import { NotFoundException } from "../models/exception-http"
import { removeFile } from "../tools/files"

class ImageService {
  public async deleteImage(id: number) {
    var image = await imageRepository.findImage(id)

    if(!image) throw new NotFoundException('image not found')

    removeFile(image.source)

    await imageRepository.deleteImage(id)
  }
}

export const imageService = new ImageService()