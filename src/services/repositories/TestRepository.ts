import { tests } from "@/db/schema";
import { BaseRepository } from "./BaseRepository";


export class TestRepository extends BaseRepository<typeof tests> {
  constructor() {
    super(tests);
  }

  async getTestById(id: string) {
    const test = await this.db.query.tests.findFirst({
      where: (tests, { eq }) => eq(tests.id, id),
    });
    return test;
  }
}
