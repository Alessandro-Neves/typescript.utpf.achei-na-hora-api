import { Prisma } from '../database'
import { prisma, User } from "@prisma/client";
import { ConsoleBlue, ConsoleError, ConsoleSuccess, ConsoleWarn } from "../tools/console";
import { ExceptionResponse, SimpleResponse } from "../models/default-response-dtos";
import { UserCreateRequestDTO } from '../models/user-dtos';

class UserService {
   public async createUser(dto: UserCreateRequestDTO): Promise<[number, (SimpleResponse | ExceptionResponse)]> {

      let user: User | null
      var response: SimpleResponse | ExceptionResponse

      function handleException(status: number, msg: string, error: boolean): [number, ExceptionResponse] {
         error && ConsoleError(`[ Exception on AuthService::login at email: ${dto.email} ]`)
         !error && ConsoleWarn(`[ Fail operation on AuthService::login at email: ${dto.email} ]`);
         response = {
            status,
            msg
         }

         return [status, response]
      }

      try {
         if (!dto.email || !dto.password)
            return handleException(400, 'BAD_REQUEST: argumentos inválidos !', false)

         var exists = !!await Prisma.user.findFirst({
            where: {
               email: dto.email
            }
         })

         if(exists)
            return handleException(406, 'NOT_ACCEPTABLE: usuário já existe !', false)

      }catch(error){
         return handleException(500, 'INTERNAL_SERVER_ERROR: encontrar usuário', true)
      }

      try {
         user = await Prisma.user.create({
            data: {
               email: dto.email,
               password: dto.password,
               updated_at: new Date()
            }
         })
      }catch(error){
         return handleException(500, 'INTERNAL_SERVER_ERROR: criar usuário', true)
      }

      ConsoleBlue(`[ Success operation on AuthService::login at email: ${dto.email} ]`); 
      return [201, { msg: `Usuário com email '${user.email}' criado com sucesso !` }]
   }
}

export default new UserService()