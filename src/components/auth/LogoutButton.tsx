'use client'

import { signOut } from "next-auth/react";
import { MdOutlineLogout } from "react-icons/md";





export const LogoutButton = () => {
  return (
    <button onClick={() => signOut()} className="btn flex items-center justify-center btn-secondary">
      Logout
      <MdOutlineLogout className="mr-2 text-2xl" />

    </button>
  );
}
