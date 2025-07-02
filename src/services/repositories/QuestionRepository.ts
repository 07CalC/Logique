import { questions } from "@/db/schema";
import { BaseRepository } from "./BaseRepository";




export class QuestionRepository extends BaseRepository<typeof questions> {
  constructor() {
    super(questions);
  }

  async getQuestionById(id: string) {
    const question = await this.db.query.questions.findFirst({
      where: (questions, { eq }) => eq(questions.id, id),
    })
    return question;
  }
}
