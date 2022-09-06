export type LoginRequestDTO = {
  email: string,
  password: string
}

export type LoginResponseDTO = {
  msg: string,
  token: string
}