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

export type ObjectResponseDTO = {
   title: string,
   description: string,
   location: string,
   type: Object_type | null,
   tag: string,
   images: string[]
   owner: number | null,
   discoverer: number | null
}

export const isObjectResponseDTO = (obj: any): obj is ObjectResponseDTO => 
   !!(obj.title && obj.description && obj.location && obj.type && obj.tag && obj.images && (obj.owner || obj.discoverer))

export const isObjectCreateRequestDTO = (obj: any): obj is ObjectCreateRequestDTO =>
   !!(obj.title && obj.description && obj.location && obj.type && obj.tag)