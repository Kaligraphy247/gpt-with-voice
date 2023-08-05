import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ChevronLeftSquare } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/custom-sheets";

export default function CollapsibleSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="z-50 fixed right-0 mx-2 mt-10">
          <Button variant="outline" className="rounded-lg">
            <ChevronLeftSquare size={16} />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Select a chat</SheetTitle>
          <SheetDescription>Select a chat to continue.</SheetDescription>
        </SheetHeader>
        <div className="border-0 overflow-y-auto">
          <ul className="w-full space-y-4 py-4">
            <li className="w-full border p-2 rounded-md">
              <Link href={"/chat/42"}>content 42</Link>
            </li>
            <li className="w-full border p-2 rounded-md">
              <Link href={"/chat/69"}>content 69</Link>
            </li>
            <li className="w-full border p-2 rounded-md">
              <Link href={"/chat/another"}>content another</Link>
            </li>
          </ul>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <div className="border mx-auto">
              <Button type="button">Dismiss</Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
