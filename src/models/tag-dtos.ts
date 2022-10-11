export type TagDTO = {
  id: number,
  title: string,
  description: string
}

export type TagResumeDTO = {
  id: number, 
  title: string
}

export const anyToTagDTO = (obj: any): TagDTO => {
  return {
    id: obj?.id ?? -1,
    title: obj?.title ?? '',
    description: obj?.description ?? ''
  }
}