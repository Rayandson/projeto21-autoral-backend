// import { UserParams } from "@/protocols/usersProtocols";
// import usersRepository from "@/repositories/usersRepository";
import { UserParams } from "../../protocols/usersProtocols";
import usersRepository from "../../repositories/usersRepository";

async function createUser(userParams: UserParams) {
    const user = await usersRepository.createUser(userParams);

    return user;
}

const usersService = {
    createUser
}

export default usersService;