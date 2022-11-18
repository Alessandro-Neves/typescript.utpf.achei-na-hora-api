import { Response } from "express"

export class HttpException {
  statusCode: number
  message: string

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode,
    this.message = message
  }
}

export class BadRequestException extends HttpException {
  constructor(message?: string){
    super(400, message ? `Bad Request: ${message}` : 'Bad Request')
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message?: string){
    super(401, message ? `Unauthorized: ${message}` : 'Unauthorized')
  }
}

export class ForbiddenException extends HttpException {
  constructor(message?: string){
    super(403, message ? `Forbidden: ${message}` : 'Forbidden')
  }

}

export class NotFoundException extends HttpException {
  constructor(message?: string){
    super(404, message ? `Not Found: ${message}` : 'Not Found')
  }
}

export class ConflictException extends HttpException {
  constructor(message?: string){
    super(409, message ? `Conflict: ${message}` : 'Conflict')
  }
}

export class PayloadTooLargeException extends HttpException {
  constructor(message?: string){
    super(413, message ? `Payload Too Large: ${message}` : 'Payload Too Large')
  }
}

export class UnsupportedMediaTypeException extends HttpException {
  constructor(message?: string){
    super(415, message ? `Unsupported Media Type: ${message}` : 'Unsupported Media Type')
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message?: string){
    super(500, message ? `Internal Server Error: ${message}` : 'Internal Server Error')
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message?: string){
    super(503, message ? `Service Unavailable: ${message}` : 'Service Unavailable')
  }
}

export const HttpExceptionHandler = (res: Response, err: any) => {
  if(err instanceof HttpException)
    return res.status(err.statusCode).json(err)
  console.warn(err)
  return res.status(500).json(new InternalServerErrorException())
}
