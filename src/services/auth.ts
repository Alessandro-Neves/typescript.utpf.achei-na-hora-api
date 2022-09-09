import { LoginRequestDTO, LoginResponseDTO } from "../models/login-dtos";
import { Prisma } from '../database'
import { Post, Profile, User } from "@prisma/client";
import { CError } from "../tools/console";
import { ExceptionResponse } from "../models/exception-dtos";

class AuthService {
  public async login(dto: LoginRequestDTO): Promise<[number, (LoginResponseDTO | ExceptionResponse)]> {
    let allUsers: (User & {Post: Post[]; Profile: Profile | null;})[]
    var response: LoginResponseDTO | ExceptionResponse

    try {
      allUsers = await Prisma.user.findMany({
        include: {
          Post: true,
          Profile: true,
        },
      })
    }catch(error) {
      CError(`[ Error on AuthService::login at email: ${dto.email} ]`)
      response = {
        status: 404,
        msg: 'Erro ao fazer login!'
      }

      return [404, response]
    }

    response = {
      msg: 'Login Success',
      token: '5f4dcc3b5aa765d61d8327deb882cf99'
    }

    return [202, response]
  }
}

export default new AuthService();