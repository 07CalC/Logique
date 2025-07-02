import { Table } from "drizzle-orm";
import { db as dbClient } from "@/db/init";



export abstract class BaseRepository<TTable extends Table> {
  constructor(
    protected readonly table: TTable,
    protected readonly db = dbClient,
  ) { }

  async findAll(): Promise<TTable['$inferSelect'][]> {
    return this.db.select().from(this.table as any)
  }
}
