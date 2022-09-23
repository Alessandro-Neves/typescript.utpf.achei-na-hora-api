import { User, Person } from "@prisma/client";
import { SimpleResponse } from "../models/simple-response";
import { isUserCreateRequestDTO, UserCreateRequestDTO, UserResponseDto } from '../models/user-dtos';
import ExceptionHttpResponse from '../models/exception-http';
import { userRepository } from '../database/repositories/user-repository';
import { personRepository } from '../database/repositories/person-repository';

class UserService {

   /**
    * Cria um usuario com os atributos fornecidos pelo dto.
    * @returns SimpleResponse em caso de sucesso.
    * @returns ExceptionHttpResponse personalizado caso qualquer exception aconteça.
    * @param dto objeto com os atributos necessários para criar um usuário (User + Person)
    */
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
         if (error instanceof ExceptionHttpResponse) return error
         return new ExceptionHttpResponse(500, 'INTERNAL_SERVER_ERROR: criar usuário')
      }

      return new SimpleResponse(`Usuário com email '${user.email}' criado com sucesso !`)
   }

   /**
    * Busca um usuário pelo email fornecido.
    * @returns UserResponseDto com os dados do usuário encontrado em caso de sucesso.
    * @returns ExceptionHttpResponse personalizado caso qualquer exception aconteça.
    * @param email email do usuário  a ser buscado.
    */
   public async findUserByEmail(email: string): Promise<UserResponseDto | ExceptionHttpResponse> {
      let user: User | undefined
      let person: Person | undefined

      try {
         if (!email || !email.length) throw new ExceptionHttpResponse(400, 'BAD_REQUEST: argumentos inválidos !')

         user = await userRepository.findUserByEmail(email)

         if(!user) throw new ExceptionHttpResponse(404, 'NOT_FOUND: usuário não encontrado !')

         person = await personRepository.findPersonByUserId(user.id)

         if(!person) throw new ExceptionHttpResponse(404, 'NOT_FOUND: usuário[pessoa] não encontrado !')

      } catch (error) {
         if (error instanceof ExceptionHttpResponse) return error
         return new ExceptionHttpResponse(500, 'INTERNAL_SERVER_ERROR: buscar usuario')
      }

      return new UserResponseDto(
         user.email, 
         person.full_name, 
         person.nickname, 
         person.campus ?? '', 
         user.created_at, 
         user.updated_at)
   }

   /**
    * Deleta o usuário com o email especificado.
    * @returns SimpleResponse caso o usuário exista e tenha sido deletado com sucesso.
    * @returns ExceptionHttpResponse personalizado caso qualquer exception aconteça.
    * @param email email do usuário a ser deletado.
    */
   public async deleteUserByEmail(email: string): Promise< SimpleResponse | ExceptionHttpResponse > {
      var user: User | undefined
      var person: Person | undefined

      try {
         if (!email || !email.length) throw new ExceptionHttpResponse(400, 'BAD_REQUEST: argumentos inválidos !')

         user = await userRepository.findUserByEmail(email)

         if(!user) throw new ExceptionHttpResponse(404, 'NOT_FOUND: usuário não encontrado !')

         person = await personRepository.findPersonByUserId(user.id)

         if(!person) throw new ExceptionHttpResponse(404, 'NOT_FOUND: usuário[pessoa] não encontrado !')

         if(!personRepository.deletePersonById(person.id))
            throw new ExceptionHttpResponse(500, 'INTERNAL_SERVER_ERROR: deletar pessoa')

         if(!userRepository.deleteUserById(user.id))
            throw new ExceptionHttpResponse(500, 'INTERNAL_SERVER_ERROR: deletar usuario')

         return new SimpleResponse(`Usuario com email '${email}' deletado com sucesso !`)
      } catch (error) {
         if (error instanceof ExceptionHttpResponse) return error
         return new ExceptionHttpResponse(500, 'INTERNAL_SERVER_ERROR: buscar usuario')
      }
   }

}

export const userService = new UserService()