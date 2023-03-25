import { prisma } from "@/config";
import { UserParams } from "@/protocols/usersProtocols";
import { User } from "@prisma/client";

function createUser(user: UserParams) {
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