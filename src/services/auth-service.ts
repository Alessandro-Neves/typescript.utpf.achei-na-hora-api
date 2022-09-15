import { LoginRequestDTO, LoginResponseDTO } from "../models/login-dtos";
import { Prisma } from '../database'
import { User } from "@prisma/client";
import { ConsoleBlue, ConsoleError, ConsoleSuccess, ConsoleWarn } from "../tools/console";
import { ExceptionResponse } from "../models/exception-dtos";

class AuthService {
  public async login(dto: LoginRequestDTO): Promise<[number, (LoginResponseDTO | ExceptionResponse)]> {

    let user: User | null;
    var response: LoginResponseDTO | ExceptionResponse

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
      if(!dto.email) throw new Error()
      user = await Prisma.user.findUnique({where: {email: dto.email}})
    }catch(error) {
      return handleException(400, 'BAD_REQUEST: argumento inválido !', true)
    }

    if(!user)
      return handleException(404, 'NOT_FOUND: usuário não encontrado ou permição de acesso negada !', false)

    ConsoleBlue(`[ Success operation on AuthService::login at email: ${dto.email} ]`); 

    response = {
      msg: user.email,
      token: '5f4dcc3b5aa765d61d8327deb882cf99'
    }

    return [202, response]
  }
}

export default new AuthService();