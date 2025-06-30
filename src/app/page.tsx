'use client';
import { db } from "@/db/init";
import { trpc } from "@/lib/trpc";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const { data, isLoading } = trpc.test.hello.useQuery({ name: session.data?.user?.name || 'Guest' });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={() => signIn('google')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        Sign In with Google
      </button>
      <p>
        {session.status === 'authenticated' ? (
          <span>{data}</span>
        ) : (
          <span>Please sign in to continue.</span>
        )}
      </p>
    </div>

  );
}
