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
}

export const personRepository = new PersonRepository()