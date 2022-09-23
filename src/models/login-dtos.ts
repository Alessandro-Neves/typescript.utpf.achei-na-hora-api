export type LoginRequestDTO = {
  email: string,
  password: string
}

export const isLoginRequestDto = (obj: any): obj is LoginRequestDTO => !!(obj.email && obj.password)

export class LoginResponseDTO {
  constructor(message: string, token: string){
    this.message = message
    this.token = token
  }

  message: string
  token: string
}