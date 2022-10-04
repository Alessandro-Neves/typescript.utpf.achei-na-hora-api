import { objectRepository } from "../database/repositories/object-repository"
import ExceptionHttpResponse from "../models/exception-http"
import { isObjectCreateRequestDTO, ObjectCreateRequestDTO, ObjectResponseDTO } from "../models/object-dtos"
import { SimpleResponse } from "../models/simple-response"
import { Object, Object_type } from "@prisma/client"
import { imageRepository } from "../database/repositories/image-repository"
import { response } from "express"

class ObjectService {
  public async createObject(dto: ObjectCreateRequestDTO): Promise<SimpleResponse | ExceptionHttpResponse | any> {
    var object: Object

    try {

      if(!isObjectCreateRequestDTO(dto)) throw new ExceptionHttpResponse(400, 'BAD_REQUEST: argumentos inválidos !')

      /* TODO: ownerId válido? */
      /* TODO: discovereId válido? */

      object = await objectRepository.createObject(
        dto.title,
        dto.description,
        dto.location,
        dto.type,
        dto.tag,
        dto.image,
        dto.ownerId,
        dto.discovererId
      )

      var response: ObjectResponseDTO = {
        title: object.title,
        description: object.description ?? '',
        images: await (await imageRepository.findAllImages()).map(img => img.source),
        location: object.location ?? '',
        type: object.type,
        tag: 'TO DO',
        owner: object.owner_id ?? -1,
        discoverer: object.discoverer_id ?? -1
      }

    } catch (error) {
      if (error instanceof ExceptionHttpResponse) return error
      return new ExceptionHttpResponse(500, 'INTERNAL_SERVER_ERROR: criar usuário')
    }

    return response
  }
}

export const objectService = new ObjectService()