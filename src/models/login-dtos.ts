export type LoginRequestDTO = {
  email: string,
  password: string
}

export const isLoginRequestDto = (obj: any): obj is LoginRequestDTO => !!(obj.email && obj.password)

export class LoginResponseDTO {
  constructor(msg: string, token: string){
    this.msg = msg
    this.token = token
  }

  msg: string
  token: string
}