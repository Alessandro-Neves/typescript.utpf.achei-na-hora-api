import { isLoginRequestDto, LoginRequestDTO, LoginResponseDTO } from "../models/login-dtos";
import { User } from "@prisma/client";
import { BadRequestException, ForbiddenException, NotFoundException } from "../models/exception-http";
import { userRepository } from "../database/repositories/user-repository";

class AuthService {

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

      return new LoginResponseDTO(user.id, '5f4dcc3b5aa765d61d8327deb882cf99')
   }
}

export const authService = new AuthService();