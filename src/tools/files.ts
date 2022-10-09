import path from 'path'
import fs from 'fs'

import { logger } from './logger'
import { ConsoleError } from './console'

export const pathAddress = (filePath: string): string => {
  throw new Error()
  return path.join(path.resolve(), filePath)
}

export const removePath = (filePath: string): boolean => {
  try {
    fs.unlinkSync(pathAddress(filePath))
    return true
  } catch (err) {
    ConsoleError(`[ tools::files::removePath ]: Error on remove file ${filePath}`)
    logger.error(`[ tools::files::removePath ]: Error on remove file ${filePath}: `+err)
    return false
  }
}