import { TestRepository } from "./repositories/TestRepository";
import { UserRespository } from "./repositories/UserRespository";

export class DbService {
  readonly users = new UserRespository();
  readonly tests = new TestRepository();
}
