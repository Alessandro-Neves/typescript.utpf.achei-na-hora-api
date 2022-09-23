import { objectRepository } from "../database/repositories/object-repository"
import ExceptionHttpResponse from "../models/exception-http"
import { isObjectCreateRequestDTO, ObjectCreateRequestDTO } from "../models/object-dtos"
import { SimpleResponse } from "../models/simple-response"
import { Object, Object_type } from "@prisma/client"

class ObjectService {
  public async createObject(dto: ObjectCreateRequestDTO): Promise<SimpleResponse | ExceptionHttpResponse> {
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

    } catch (error) {
      if (error instanceof ExceptionHttpResponse) return error
      return new ExceptionHttpResponse(500, 'INTERNAL_SERVER_ERROR: criar usuário')
    }

    return new SimpleResponse(`Usuário com titulo '${object.title}' criado com sucesso !`)
  }
}

export const objectService = new ObjectService()