import { Person } from "@prisma/client";
import { Prisma } from "..";

class PersonRepository {
  public async createPerson(userId: number, fullName: string, nickName: string, campus: string, image: any) {
    return await Prisma.person.create({
       data: {
          user_id: userId,
          full_name: fullName,
          nickname: nickName,
          campus: campus,
          image: null,
          updated_at: new Date(),
       }
    })
  }

  public async findPersonByUserId(id: number): Promise<Person | undefined> {
    return await Prisma.person.findFirst({
       where: {
          user_id: id
       }
    }) ?? undefined
 }
}

export const personRepository = new PersonRepository()