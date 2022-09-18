import { Prisma } from '..'
import { User, Person } from "@prisma/client";


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
}

export const userRepository = new UserRepository()