import { User, Person } from "@prisma/client";
import { SimpleResponse } from "../models/simple-response";
import { isUserCreateRequestDTO, UserCreateRequestDTO, UserResponseDTO } from '../models/user-dtos';
import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException } from '../models/exception-http';
import { userRepository } from '../database/repositories/user-repository';
import { personRepository } from '../database/repositories/person-repository';

class UserService {

   /**
    * Creates a user with the attributes provided by dto.
    * @returns SimpleResponse on success.
    * @throws ExceptionHttp as BadRequestException, ConflictException ou Error.
    * @param dto object with the attributes needed to create a user (User + Person).
    */
   public async createUser(dto: UserCreateRequestDTO): Promise<UserResponseDTO> {

      let user: User | undefined
      let person: Person | undefined

      if (!isUserCreateRequestDTO(dto)) throw new BadRequestException('invalid arguments')

      var exists = !!await userRepository.findUserByEmail(dto.email)

      if (exists) throw new ConflictException('user already exists')

      user = await userRepository.createUser(dto.email, dto.password)

      person = await personRepository.createPerson(user.id, dto.fullName, dto.nickName, dto.campus, null)

      return new UserResponseDTO(
         user.id,
         user.email, 
         person.full_name, 
         person.nickname, 
         person.campus ?? '', 
      )
   }

   /**
    * Searches for a user by email.
    * @returns UserResponseDTO on success.
    * @returns ExceptionHttpResponse as BadRequestException, NotFoundException, ConflictException or Error.
    * @param email user email to be searched.
    */
   public async findUserByEmail(email: string): Promise<UserResponseDTO> {
      let user: User | undefined
      let person: Person | undefined

      if (!email || !email.length) throw new BadRequestException('invalid arguments')

      user = await userRepository.findUserByEmail(email)

      if(!user) throw new NotFoundException('user not found')

      person = await personRepository.findPersonByUserId(user.id)

      if(!person) throw new ConflictException("user exists, but user's person doesn't")

      return new UserResponseDTO(
         user.id,
         user.email, 
         person.full_name, 
         person.nickname, 
         person.campus ?? '', 
      )
   }

   /**
    * Delete user by email.
    * @returns SimpleResponse on sucess.
    * @returns ExceptionHttpResponse as BadRequestException, NotFoundException, ConflictException, InternalServerErrorException or Error.
    * @param email user email to be deleted.
    */
   public async deleteUserByEmail(email: string): Promise< SimpleResponse > {
      var user: User | undefined
      var person: Person | undefined

      if (!email || !email.length) throw new BadRequestException('invalid arguments')

      user = await userRepository.findUserByEmail(email)

      if(!user) throw new NotFoundException('user not found')

      person = await personRepository.findPersonByUserId(user.id)

      if(!person) throw new ConflictException("user exists, but user's person doesn't")

      if(!personRepository.deletePerson(person.id))
         throw new InternalServerErrorException("delete user's person")

      if(!userRepository.deleteUser(user.id))
         throw new InternalServerErrorException("delete user")

      return new SimpleResponse(`user with email '${user.email}' deleted successfully !`)
   }

}

export const userService = new UserService()