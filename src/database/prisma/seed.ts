import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const createDefaultUsers = async () => {
  var usersPersons = [
    {
      user: {
        email: 'userOne@email.com',
        password: 'userOnePass',
        updatedAt: new Date()
      },
      person: {
        nickname: 'userOne',
        full_name: 'user One Full Name',
        updatedAt: new Date(),
        campus: 'Campo Mourão',
      }
    },
    {
      user: {
        email: 'userTwo@email.com',
        password: 'userTwoPass',
        updatedAt: new Date()
      },
      person: {
        nickname: 'userTwe',
        full_name: 'user Two Full Name',
        updatedAt: new Date(),
        campus: 'Campo Mourão',
      }
    }
  ]

  for(let userPerson of usersPersons){
    await prisma.user.create({
      data: {
        ...userPerson.user, 
        Person: { create: {...userPerson.person} }
      }
    })
  }

}

const createDefaultTags = async () => {
  var tags = [
    {
      title: 'garrafinha',
      description: 'garrafinha de água, garrafinha de bebida, garrafinha de plástico, garrafinha de metal'
    },
    {
      title: 'celular',
      description: 'celular, telefone'
    },
    {
      title: 'material escolar',
      description: 'material escolar, mochila, caneta, borracha'
    }
  ]

  await prisma.tag.createMany({
    data: tags
  })
}

async function seed () {
  await createDefaultUsers()
  await createDefaultTags()
}

seed()
  .then(() => 
    console.log('\n[Prisma] database seeded successfully')
  )
  .catch((e) => {
    console.log('\n[Prisma] Error on seed database')
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });