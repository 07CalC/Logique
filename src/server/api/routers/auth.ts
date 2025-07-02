import { accounts, users } from "@/db/schema";
import { protectedProcedure, publicProcedure, router } from "@/server/trpc";
import { eq } from "drizzle-orm";




export const authRouter = router({
  getUser: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user) {
      return null;
    }
    const user = await ctx.db.query.accounts.findFirst({
      where: eq(accounts.userId, ctx.session.user.id),
    })
    return user || null;
  }),
  protected: protectedProcedure.query(() => {
    return "This is a protected route";
  })
})
