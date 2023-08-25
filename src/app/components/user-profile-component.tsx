"use client";

// import { Button } from "./ui/button";
import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserProfileComponent({
  loginState,
}: {
  loginState: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();

  /**
   * Logs out the user by making a request to the "/api/logout" endpoint.
   *
   * @return {Promise<void>} Promise that resolves when the logout process is complete.
   */
  const logout = async (): Promise<void> => {
    await fetch("/api/logout");

    //? client side redirection to home page & manually refreshing
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1500);

    toast({
      title: "Bye, come back soon!",
    });
  };

  /**
   * Attempts to log the user in by redirecting to the login page.
   *
   * @return {void} No return value.
   */
  const login = (): void => {
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/chats"} className="w-full">
            Chats
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/settings"} className="w-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="w-full cursor-pointer">
            {loginState ? (
              <p onClick={logout}>Logout</p>
            ) : (
              <p onClick={login}>Login</p>
            )}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
