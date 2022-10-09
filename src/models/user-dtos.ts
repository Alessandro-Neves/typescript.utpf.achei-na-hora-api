export type UserCreateRequestDTO = {
  email: string
  password: string
  fullName: string
  nickName: string
  campus: string
}

export const isUserCreateRequestDTO = (obj: any): obj is UserCreateRequestDTO => !!(obj.email && obj.password && obj.fullName && obj.nickName && obj.campus)

export class UserResponseDTO {

  constructor( id: number, email: string, fullName: string, nickName: string, campus: string){
    this.id = id
    this.email = email
    this.fullName = fullName
    this.nickName = nickName
    this.campus = campus
  }
  
  id: number
  email: string
  fullName: string
  nickName: string
  campus: string
}