import app, { init } from "../../src/app";
import { prisma } from "../../src/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/usersFactory";
import { cleanDb } from "../helpers";
import { duplicatedEmailError } from "../../src/services/usersService/errors";
import { generateCPF } from "@brazilian-utils/brazilian-utils";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /users", () => {
  jest.setTimeout(35000); 
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/users");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/users").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      cpf: generateCPF(),
      password: faker.internet.password(6),
    });

    // it("should respond with status 409 when there is an user with given email", async () => {
    //   const body = generateValidBody();
    //   await createUser(body);

    //   const response = await server.post("/users").send(body);

    //   expect(response.status).toBe(httpStatus.CONFLICT);
    // });

    it("should respond with status 201 and create user when given email is unique", async () => {
      const body = generateValidBody();

      const response = await server.post("/users").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});
