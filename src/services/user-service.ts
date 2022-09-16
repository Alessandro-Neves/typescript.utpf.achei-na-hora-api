import { Prisma } from '../database'
import { prisma, User, Person } from "@prisma/client";
import { ConsoleBlue, ConsoleError, ConsoleSuccess, ConsoleWarn } from "../tools/console";
import { ExceptionResponse, SimpleResponse } from "../models/default-response-dtos";
import { UserCreateRequestDTO } from '../models/user-dtos';

class ExceptionHttpResponse {
   status: number
   message: string

   constructor(status: number, message: string) {
      this.message = message
      this.status = status
   }
}


class UserService {
   private async createUserDB(email: string, password: string): Promise<User> {
      return await Prisma.user.create({
         data: {
            email,
            password,
            updated_at: new Date()
         }
      })
   }

   private async findUserByEmail(email: string): Promise<User | undefined> {
      return await Prisma.user.findFirst({
         where: {
            email: email
         }
      }) ?? undefined
   }

   public async createUser(dto: UserCreateRequestDTO): Promise<[number, (SimpleResponse | ExceptionResponse)]> {

      let user: User | null
      let person: Person | null
      var response: SimpleResponse | ExceptionResponse

      function handleException(status: number, msg: string, error: boolean): [number, ExceptionResponse] {
         error && ConsoleError(`[ Exception on UserService::createUser at email: ${dto.email} ]`)
         !error && ConsoleWarn(`[ Fail operation on UserService::createUser at email: ${dto.email} ]`);
         response = {
            status,
            msg
         }

         return [status, response]
      }

      try {
         if (!dto.email || !dto.password) throw new ExceptionHttpResponse(400, 'BAD_REQUEST: argumentos inválidos !')

         var exists = !!await this.findUserByEmail(dto.email)

         if (exists) throw new ExceptionHttpResponse(406, 'NOT_ACCEPTABLE: usuário já existe !')

      } catch (error) {
         if (error instanceof ExceptionHttpResponse)
            return handleException(error.status, error.message, false)
         return handleException(500, 'INTERNAL_SERVER_ERROR: encontrar usuário', true)
      }

      try {
         user = await this.createUserDB(dto.email, dto.password)
      } catch (error) {
         return handleException(500, 'INTERNAL_SERVER_ERROR: criar usuário', true)
      }

      try {
         person = await Prisma.person.create({
            data: {
               user_id: user.id,
               full_name: dto.fullName,
               nickname: dto.nickName,
               campus: dto.campus,
               image: null,
               updated_at: new Date(),
            }
         })
      } catch (error) {
         return handleException(500, 'INTERNAL_SERVER_ERROR: criar pessoa', true)
      }



      ConsoleBlue(`[ Success operation on UserService::createUser at email: ${dto.email} ]`);
      return [201, { msg: `Usuário com email '${user.email}' criado com sucesso !` }]
   }

}


export default new UserService()