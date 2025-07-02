import { auth } from "../../auth"
import superjson from "superjson"
import { initTRPC, TRPCError } from "@trpc/server";
import { db } from "@/db/init";



export const createContext = async () => {
  const session = await auth();
  return {
    session,
    db
  }
}

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  }
}
);

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "you need to login first" })
  }
  return next({ ctx: { session: ctx.session } })
})
