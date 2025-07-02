import Image from "next/image"
import { auth } from "../../auth"
import { ThemeToggle } from "./ThemeToggle";
import { LoginButton } from "./auth/LoginButton";
import { LogoutButton } from "./auth/LogoutButton";
import Link from "next/link";

export const Navbar = async () => {
  const session = await auth();
  return (
    <div className="flex px-10 fixed w-full top-0 h-20 items-center border-b-2 border-primary justify-between bg-base-300">
      <Link href={"/"} className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={60}
          height={60}
          className=""
        />
        <span className="text-4xl text-base-content font-mono font-bold ml-2">Logique</span>
      </Link>
      <div className="flex gap-x-5">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-12 rounded-full">
              <Image
                src={session?.user?.image || "/default-avatar.png"}
                alt="Avatar"
                width={60}
                height={60}
              />
            </div>
          </label>
          {session?.user ? (
            <ul
              tabIndex={0}
              className="menu menu-xl text-2xl text-center border border-primary dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-44"
            >
              <li>
                <LogoutButton />
              </li>
            </ul>
          ) : (
            <LoginButton />
          )}
        </div>
        <ThemeToggle />
      </div>
    </div>
  )
}
