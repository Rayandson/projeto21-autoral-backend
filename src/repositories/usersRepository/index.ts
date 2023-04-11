// import { prisma } from "@/config";
// import { UserParams } from "@/protocols/usersProtocols";
import { prisma } from "../../config";
import { UserParams } from "../../protocols/usersProtocols";

function createUser(user: UserParams) {
  return prisma.user.create({
    data: {
      ...user,
    },
  });
}

function findUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email: email
    }
  });
}

const usersRepository = {
  createUser,
  findUserByEmail
};

export default usersRepository;
