import { ObjectStatus, ObjectType, Image } from "@prisma/client"
import { env } from 'process'

export type ObjectCreateRequestDTO = {
   title: string,
   description: string,
   location: string,
   type: ObjectType,
   image: any,
   ownerId?: number,
   discovererId?: number
}

export type ObjectResponseDTO = {
   id: number,
   title: string,
   description: string,
   location: string,
   type: ObjectType,
   images: string[]
   owner: number | null,
   discoverer: number | null,
   status: ObjectStatus
}

export const isObjectResponseDTO = (obj: any): obj is ObjectResponseDTO => 
   !!(obj.title && obj.description && obj.location && obj.type && obj.images && (obj.owner || obj.discoverer))

export const isObjectCreateRequestDTO = (obj: any): obj is ObjectCreateRequestDTO =>
   !!(obj.title && obj.description && obj.location && obj.type)

const imageToLink = (image: Image): string => {
   return `${env.IMAGES_HOST}/images/image/${image.id}`
}

export const objectToObjectResponseDTO = (obj: any): ObjectResponseDTO => {
   var images: string[] = obj?.images?.map(imageToLink) ?? []

   return {
      id: obj.id ?? -1,
      title: obj.title ?? '',
      description: obj.description ?? '',
      owner: obj.ownerId,
      discoverer: obj.discovererId,
      location: obj.location ?? '',
      type: obj.type,
      status: obj.status,
      images: images
   }
}