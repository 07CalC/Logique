// this file creates the trpc context and exports the router, publicProcedure, and protectedProcedure


import { auth } from "../../auth"
import superjson from "superjson"
import { initTRPC, TRPCError } from "@trpc/server";
import { db } from "@/db/init";

// trpc context is used to pass the session and the db instance to all the procedures
export const createContext = async () => {
  const session = await auth();
  return {
    session,
    db
  }
}

// create a TRPC instance with the context and the superjson transformer (used for serializing and deserializing data)
const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  }
}
);

// exports the router and various procedures
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "you need to login first" })
  }
  return next({ ctx: { session: ctx.session } })
})
