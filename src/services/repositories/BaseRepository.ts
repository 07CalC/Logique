import { eq, Table } from "drizzle-orm";
import { db as dbClient } from "@/db/init";



export abstract class BaseRepository<TTable extends Table> {
  constructor(
    protected readonly db = dbClient,
    protected readonly table: TTable
  ) { }

  async findAll(): Promise<TTable['$inferSelect'][]> {
    return this.db.select().from(this.table as any)
  }
}
