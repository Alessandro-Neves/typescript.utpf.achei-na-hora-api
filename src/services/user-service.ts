import { User, Person } from "@prisma/client";
import { SimpleResponse } from "../models/simple-response";
import { isUserCreateRequestDTO, UserCreateRequestDTO } from '../models/user-dtos';
import ExceptionHttpResponse from '../models/exception-http';
import { userRepository } from '../database/repositories/user-repository';
import { personRepository } from '../database/repositories/person-repository';

class UserService {

   public async createUser(dto: UserCreateRequestDTO): Promise<SimpleResponse | ExceptionHttpResponse> {

      let user: User | undefined
      let person: Person | undefined

      try {

         if (!isUserCreateRequestDTO(dto)) throw new ExceptionHttpResponse(400, 'BAD_REQUEST: argumentos inválidos !')

         var exists = !!await userRepository.findUserByEmail(dto.email)

         if (exists) throw new ExceptionHttpResponse(406, 'NOT_ACCEPTABLE: usuário já existe !')

         user = await userRepository.createUser(dto.email, dto.password)

         person = await personRepository.createPerson(user.id, dto.fullName, dto.nickName, dto.campus, null)

      } catch (error) {
         if (error instanceof ExceptionHttpResponse)
            return new ExceptionHttpResponse(error.status, error.message)
         return new ExceptionHttpResponse(500, 'INTERNAL_SERVER_ERROR: criar usuário')
      }

      return new SimpleResponse(`Usuário com email '${user.email}' criado com sucesso !`)
   }

}

export default new UserService()