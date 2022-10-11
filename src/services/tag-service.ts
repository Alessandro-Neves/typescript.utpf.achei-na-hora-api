import { isLoginRequestDto, LoginRequestDTO, LoginResponseDTO } from "../models/login-dtos";
import { User } from "@prisma/client";
import { BadRequestException, ForbiddenException, NotFoundException } from "../models/exception-http";
import { userRepository } from "../database/repositories/user-repository";
import { anyToTagDTO, TagDTO } from "../models/tag-dtos";
import { tagRepository } from "../database/repositories/tag-repository";

class TagService {

  public async findAll(): Promise<TagDTO[]> {
    var tags = await tagRepository.findAll()
    var response = tags.map(anyToTagDTO)
    return response
  }
}

export const tagService = new TagService();