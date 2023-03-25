import { prisma } from "@/config";
import { userParams } from "@/protocols/usersProtocols";
import { User } from "@prisma/client";

function createUser(user: userParams) {
  return prisma.user.create({
    data: {
      ...user,
    },
  });
}

const usersRepository = {
    createUser
}

export default usersRepository;