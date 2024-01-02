import { PrismaClient } from "@prisma/client";
import { Customer } from "./types";
import * as dotenv from "dotenv";
dotenv.config(); // Load the environment variables
console.log(`The connection URL is ${process.env.DATABASE_URL}`);

const prisma = new PrismaClient();

async function main(fn: Function) {
  fn()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e: any) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

async function prismaCustomer(data: Customer) {
  const customer = await prisma.customer.upsert({
    where: {
      id: data.id,
    },
    create: {
      name: data.name,
    },
    update: { name: data.name },
  });

  return customer;
}

export default async function save() {
  const data: Customer = {
    name: "Topcon Polska",
  };

  const save = await main(() => prismaCustomer(data));
  return save;
}
