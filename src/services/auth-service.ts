import { isLoginRequestDto, LoginRequestDTO, LoginResponseDTO } from "../models/login-dtos";
import { User } from "@prisma/client";
import ExceptionHttpResponse from "../models/exception-http";
import { userRepository } from "../database/repositories/user-repository";

class AuthService {

   /**
    * @returns LoginResponseDTO caso o login ocorra com sucesso.
    * @returns ExceptionHttpResponse personalizado caso qualquer exception aconteça ou login falhe.
    * @param dto objeto com as informações necessárias para realizar a autenticação e autorização do usuário.
    */
   public async login(dto: LoginRequestDTO): Promise<LoginResponseDTO | ExceptionHttpResponse> {

      let user: User | undefined

      try {
         if (!isLoginRequestDto(dto)) throw new ExceptionHttpResponse(400, 'BAD_REQUEST: argumentos inválidos !')

         user = await userRepository.findUserByEmail(dto.email)

         if (!user) throw new ExceptionHttpResponse(404, 'NOT_FOUND: usuário não encontrado !')
         if (user.password != dto.password) throw new ExceptionHttpResponse(401, 'UNAUTHORIZED: permição de acesso negada !')

      } catch (error) {
         if (error instanceof ExceptionHttpResponse)  return error
         return new ExceptionHttpResponse(500, 'INTERNAL_SERVER_ERROR: login usuário')
      }

      return new LoginResponseDTO(user.email, '5f4dcc3b5aa765d61d8327deb882cf99')
   }
}

export default new AuthService();