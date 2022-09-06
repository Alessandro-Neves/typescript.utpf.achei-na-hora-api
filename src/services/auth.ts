import { LoginRequestDTO, LoginResponseDTO } from "../models/login-dtos";

class AuthService {
  public login(dto: LoginRequestDTO): [number, LoginResponseDTO] {
    var response = {
      msg: 'Login Success',
      token: '5f4dcc3b5aa765d61d8327deb882cf99'
    }

    return [202, response]
  }
}

export default new AuthService();