'use client'
import { FaGoogle } from "react-icons/fa"
import { signIn } from "next-auth/react";




export const LoginButton = () => {
  return (
    <button onClick={() => signIn('google')} className="btn text-xl btn-primary">
      <FaGoogle className="mr-2 text-2xl" />
      Login
    </button>
  );
}
