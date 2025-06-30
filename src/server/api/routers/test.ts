import { publicProcedure, router } from '@/server/trpc';
import { z } from 'zod';


export const testRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello ${input.name}`;
    })
})
