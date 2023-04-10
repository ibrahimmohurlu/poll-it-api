import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.poll.create({
    data: {
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
