// This file is used to create a TRPC client instance for use in the application.
// do not touch until its very important (dont touch)
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/api/root';

export const trpc = createTRPCReact<AppRouter>();
