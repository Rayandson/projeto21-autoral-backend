import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
import { User } from "@prisma/client";
import { prisma } from "../../src/config";
import { generateCPF } from "@brazilian-utils/brazilian-utils";

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const password = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      firstName: params.firstName || faker.name.firstName(),
      lastName: params.lastName || faker.name.lastName(),
      email: params.email || faker.internet.email(),
      cpf: params.cpf || generateCPF(),
      password: hashedPassword,
    },
  });
}
