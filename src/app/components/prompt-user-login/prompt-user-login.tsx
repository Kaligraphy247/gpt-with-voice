"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
/**
 * Prompt user to login.
 */
export default function PromptLogin() {
  return (
    <div>
      <Dialog defaultOpen>
        <DialogTrigger></DialogTrigger>
        <DialogContent
          className="my-40 md:mt-0"
          onInteractOutside={(event) => event.preventDefault()}
          onEscapeKeyDown={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              You need to be logged in to access this page.
            </DialogTitle>
            <DialogDescription>Please log in to continue</DialogDescription>
            <div className="pt-4 justify-between flex">
              <Link href={"/login"}>
                <Button>Log in</Button>
              </Link>
              <Link href={"/"}>
                <Button variant={"secondary"}>Home</Button>
              </Link>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
