import { isLoginRequestDto, LoginRequestDTO, LoginResponseDTO } from "../models/login-dtos"
import { User } from "@prisma/client"
import { BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException } from "../models/exception-http"
import { userRepository } from "../database/repositories/user-repository"

import { sign, verify } from 'jsonwebtoken'

class AuthService {

   private secret: string = String(process.env.SECRET)
   private jwtExpires: number = 30 //1h

   /**
    * @returns LoginResponseDTO if login is successful.
    * @throws ExceptionHttp as BadRequestException, NotFoundException, ForbiddenException or Error.
    * @param dto object with the information necessary to perform user authentication and authorization.
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

   public async auth(dto: any): Promise<void> {

      if(!dto || !dto.token)
         throw new BadRequestException('invalid arguments - token access')

      var decode: any = undefined

      try {
         decode = await verify(dto.token, this.secret) as any
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