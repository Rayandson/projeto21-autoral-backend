import { userParams } from "@/protocols/usersProtocols";
import usersRepository from "@/repositories/usersRepository";

async function createUser(userParams: userParams) {
    const user = await usersRepository.createUser(userParams);

    return user;
}

const usersService = {
    createUser
}

export default usersService;