import { Button } from "@/app/components/ui/button";
import { Headphones } from "lucide-react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Textarea } from "../components/ui/textarea";

export default function P() {
  return (
    <div className="animate-pulse mb-0 space-y-10 px-1">
      {/* REPLY */}
      <div className="h-4/5 border-0 p-2">
        <div className="grid w-full gap-1.5 mb-10">
          <div className="relative h-[40rem] w-full">
            <Textarea
              className="block h-full w-full resize-none rounded-md border-2 p-2 pb-16 pr-10 bg-neutral-200 dark:bg-neutral-800"
              readOnly
            />

            <Button className="absolute bottom-2 right-2 rounded-md bg-neutral-950 px-3 py-2 text-white hidden">
              <Headphones width={24} height={24} />
            </Button>
          </div>
          <p className="text-muted-foreground text-sm hidden">
            Your message will appear here.
          </p>
        </div>
      </div>
      {/* PROMPT */}
      <div className="border-0 h-1/5 p-2">
        <div className="relative h-full w-full">
          <Textarea
            className="block h-full w-full resize-none rounded-md border-2 p-2 pr-10 bg-neutral-200 dark:bg-neutral-800"
            // placeholder="Ask your question here."
            rows={8}
          />
          <Button className="absolute bottom-2 right-2 rounded-md bg-blue-500 px-6 py-2 text-white hidden">
            <PaperPlaneIcon width={16} height={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
