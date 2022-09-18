import { empty } from "@prisma/client/runtime"
import ExceptionHttpResponse from "./exception-http"

export type UserCreateRequestDTO = {
  email: string
  password: string
  fullName: string
  nickName: string
  campus: string
}

export const isUserCreateRequestDTO = (obj: any): obj is UserCreateRequestDTO => !!(obj.email && obj.password && obj.fullName && obj.nickName && obj.campus)