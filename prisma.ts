import { PrismaClient } from "@prisma/client";
import { Address, Customer } from "./types";
import * as dotenv from "dotenv";
dotenv.config(); // Load the environment variables
console.log(`The connection URL is ${process.env.DATABASE_URL}`);

const prisma = new PrismaClient();

async function main(fn: Function) {
  fn()
    .then(async (m: {}) => {
      console.log(m);

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
      address: { create: data.address },
    },
    update: {
      name: data.name,
      address: {
        update: {
          where: {
            id: data.address?.id,
          },
          data: data.address || {},
        },
      },
    },
  });

  return customer;
}

export default async function save(): Promise<void> {
  const data: Customer = {
    id: "3b53e8c8-f378-4249-89d0-3537a472ed2e",
    name: "Topcon Polska sp. z o.o.",
    address: {
      id: "7ab360da-9e9c-4930-ad4e-4bbe68d9f87d",
      street: "Warszawska 222",
      zip: "24-470",
      city: "Siewierz",
    },
  };

  await main(() => prismaCustomer(data));
}
