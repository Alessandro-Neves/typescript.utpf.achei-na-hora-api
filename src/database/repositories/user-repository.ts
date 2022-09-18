import { Prisma } from '..'
import { User, Person } from "@prisma/client";
import { personRepository } from './person-repository';


class UserRepository {
   public async createUser(email: string, password: string): Promise<User> {
      return await Prisma.user.create({
         data: {
            email,
            password,
            updated_at: new Date()
         }
      })
   }

   public async findUserByEmail(email: string): Promise<User | undefined> {
      return await Prisma.user.findFirst({
         where: {
            email: email
         }
      }) ?? undefined
   }

   public async deleteUserById(id: number): Promise<Boolean> {
      try {
         await Prisma.user.delete({
            where: {
               id: id
            }
         })

         return true
      } catch (error) {
         return false
      }
   }
}

export const userRepository = new UserRepository()