// npx ts-node tests.ts
//https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/querying-the-database-typescript-postgres

import { PrismaClient } from '@prisma/client'
import { CError, CSuccess } from './src/tools/console'

const prisma = new PrismaClient()

async function test() {
  // await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@prisma.io',
  //     Post: {
  //       create: { title: 'Hello World' },
  //     },
  //     Profile: {
  //       create: { bio: 'I like turtles' },
  //     },
  //   },
  // })

  const allUsers = await prisma.user.findMany({
    include: {
      Post: true,
      Profile: true,
    },
  })

  if(allUsers[0].email == 'alice@prisma.io'){
    CSuccess('[ OK ]');
    console.table(allUsers)
    // console.dir(allUsers, { depth: null })
  } else CError('[ Error on user::findMany ]')

}

test()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })