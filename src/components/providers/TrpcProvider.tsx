'use client';

import { getFetch, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "../../lib/trpc"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    }
  }
})

export default function TrpcProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const url =
    process.env.NEXT_PUBLIC_APP_DOMAIN &&
      !process.env.NEXT_PUBLIC_APP_DOMAIN.includes("localhost")
      ? `https://www.${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/trpc/`
      : "http://localhost:3000/api/trpc/";
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true
        }),
        httpBatchLink({
          url,
          fetch: (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include"
            });

          },
          transformer: superjson
        })
      ]
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )


}
