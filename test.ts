// npx ts-node tests.ts
//https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/querying-the-database-typescript-postgres

import { PrismaClient } from '@prisma/client'
import { ConsoleBlue, ConsoleError, ConsoleSuccess } from './src/tools/console'

const prisma = new PrismaClient()

async function testUser() {
  ConsoleBlue("[ Testando create, select e delete User ]")

  var exists = !!await prisma.user.findFirst({
    where: {
      email: "testê@email.com"
    }
  })

  exists && await prisma.user.delete({where: {email: "testê@email.com"}}) && ConsoleSuccess("[ limpando ]")


  await prisma.user.create({
    data: {
      email: 'testê@email.com',
      password: 'teste123',
      updatedAt: new Date()
    },
  })
  
  ConsoleSuccess("[ criado ]");

  const user = await prisma.user.findFirst({
    where: {
      email: "testê@email.com"
    }
  })

  ConsoleSuccess("[ encontrado ]");

  (
    user?.email == 'testê@email.com' &&
    user.password == 'teste123'
  ) ? ConsoleSuccess("[ dados corretos ]") : ConsoleError("[ dados incorretos ]")

  await prisma.user.delete({
    where: {
      email: "testê@email.com"
    }
  })

  ConsoleSuccess("[ deletado ]");

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     Post: true,
  //     Profile: true,
  //   },
  // })

  // if(allUsers.length){
  //   ConsoleSuccess('[ OK ]');
  //   console.table(allUsers)
  //   // console.dir(allUsers, { depth: null })
  // } else ConsoleError('[ Error on user::findMany ]')

}

testUser()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })