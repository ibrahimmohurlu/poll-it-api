import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const testMail = "test@mail.com";
  const testPassword = "test";

  const saltOrRounds = 10;
  const salt = await bcrypt.genSalt(saltOrRounds);
  const testHash = await bcrypt.hash(testPassword, salt);

  await prisma.user.create({
    data: {
      email: "test@mail.com",
      hash: testHash,
      salt: salt,
    },
  });
  await prisma.poll.create({
    data: {
      user: {
        connect: {
          email: testMail,
        },
      },
      question: "Is cats awesome?",
      poll_options: {
        create: [
          {
            body: "Yes",
          },
          {
            body: "I dont know",
          },
        ],
      },
    },
  });
  await prisma.poll.create({
    data: {
      user: {
        connect: {
          email: testMail,
        },
      },
      question: "Is dogs awesome?",
      poll_options: {
        create: [
          {
            body: "Yes",
          },
          {
            body: "I dont know",
          },
        ],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
