// "use client"

import { ToggleDarkMode } from "./toggle-dark-mode";
import { TailwindIndicator } from "./tailwind-indicator";
import { cookies } from "next/headers";
import UserProfileComponent from "./user-profile-component";
import Link from "next/link";

export default function AppBar() {
  const cookieJar = cookies();
  //? if said cookie exists, then user is logged in
  const isLoggedIn = cookieJar.get("access_token") !== undefined ? true : false;
  // console.log(cookieJar); //! DEBUG

  return (
    <nav className="flex justify-between rounded border px-3 py-4">
      <Link href={"/"}>
        <h2 className="pt-2 text-2xl font-semibold">GPT with Voice</h2>
      </Link>
      <div className="flex space-x-4">
        <ToggleDarkMode />
        <TailwindIndicator />
        <UserProfileComponent loginState={isLoggedIn} />
      </div>
    </nav>
  );
}
