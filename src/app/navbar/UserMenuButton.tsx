"use client";
import { Session } from "next-auth";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { IoReorderThreeOutline } from "react-icons/io5";

interface UserMenuButtonProps {
  session: Session | null;
}
const UserMenuButton = ({ session }: UserMenuButtonProps) => {
  const user = session?.user;
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        {user ? (
          <Image
            src={user?.image || profilePicPlaceholder}
            alt="Profile picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <IoReorderThreeOutline size={24} />
        )}
      </label>
      <ul
        tabIndex={0}
        className="munu munu-sm dropdown-content rounded-box z-30 mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              {" "}
              Sign out
            </button>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserMenuButton;
