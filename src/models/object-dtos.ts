import { Object_type } from "@prisma/client"

export type ObjectCreateRequestDTO = {
   title: string,
   description: string,
   location: string,
   type: Object_type,
   tag: string,
   image: any,
   ownerId?: number,
   discovererId?: number
}

export const isObjectCreateRequestDTO = (obj: any): obj is ObjectCreateRequestDTO =>
   !!(obj.title && obj.description && obj.location && obj.type && obj.tag)