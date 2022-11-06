import { isLoginRequestDto, LoginRequestDTO, LoginResponseDTO } from "../models/login-dtos"
import { User } from "@prisma/client"
import { BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException } from "../models/exception-http"
import { userRepository } from "../database/repositories/user-repository"

import { sign, verify } from 'jsonwebtoken'

class AuthService {

   private secret: string = String(process.env.SECRET)
   private jwtExpires: number = 3600 //1h

   /**
    * @returns LoginResponseDTO quando login é realizado com sucesso.
    * @throws ExceptionHttp ( BadRequestException, NotFoundException, ForbiddenException or Error ).
    * @param dto objeto com as informações necessárias para realizar a autenticação e autorização do usuário.
    */
   public async login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {

      let user: User | undefined

      if (!isLoginRequestDto(dto)) throw new BadRequestException('invalid arguments')

      user = await userRepository.findUserByEmail(dto.email)

      if (!user) throw new NotFoundException('user not found')

      if (user.password != dto.password) throw new ForbiddenException('failed authentication')

      var token = await sign({
         id: user.id,
         email: user.email
      }, this.secret, {
         expiresIn: this.jwtExpires
      })

      return new LoginResponseDTO(user.id, token)
   }

   /**
    * @returns void quando a autenticação é realizada com sucesso.
    * @throws ExceptionHttp ( BadRequestException, NotFoundException, UnauthorizedException, ForbiddenException or Error ).
    * @param token token jwt do usuário.
    */
   public async auth(token: string): Promise<void> {

      if(!token)
         throw new BadRequestException('invalid arguments - token access')

      var decode: any = undefined

      try {
         decode = await verify(token, this.secret) as any
      } catch (e) {
         throw new UnauthorizedException('invalid token')
      }

      if(!decode || !decode.id || !decode.email)
         throw new BadRequestException('invalid token')

      if(!decode.exp || (decode.exp * 1000) < Date.now())
         throw new ForbiddenException('expired token')

      var user = await userRepository.findUser(Number(decode.id))

      if(!user)   throw new NotFoundException('user notfound')

      if(user.email != decode.email)   throw new ForbiddenException('failed authentication')
   }
}

export const authService = new AuthService();