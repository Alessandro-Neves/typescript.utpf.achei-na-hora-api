export type UserCreateRequestDTO = {
  email: string
  password: string
  fullName: string
  nickName: string
  campus: string
}

export const isUserCreateRequestDTO = (obj: any): obj is UserCreateRequestDTO => !!(obj.email && obj.password && obj.fullName && obj.nickName && obj.campus)

export class UserResponseDto {

  constructor( email: string, fullName: string, nickName: string, campus: string, createdAt: Date, updatedAt: Date){
    this.email = email
    this.fullName = fullName
    this.nickName = nickName
    this.campus = campus
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
  
  email: string
  fullName: string
  nickName: string
  campus: string
  createdAt: Date
  updatedAt: Date
}