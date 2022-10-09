export type LoginRequestDTO = {
  email: string,
  password: string
}

export const isLoginRequestDto = (obj: any): obj is LoginRequestDTO => !!(obj.email && obj.password)

export class LoginResponseDTO {
  constructor(id: number, token: string){
    this.id = id
    this.token = token
  }

  id: number
  token: string
}