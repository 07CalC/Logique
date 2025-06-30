import { auth } from "../../auth"
import superjson from "superjson"
import { initTRPC } from "@trpc/server";



export const createContext = async () => {
  const session = await auth();
  return {
    session
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
    throw new Error("UNAUTHORIZED");
  }
  return next({ ctx: { session: ctx.session } })
})
