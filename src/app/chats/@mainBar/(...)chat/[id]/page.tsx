import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Headphones } from "lucide-react";

export default async function Chat({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <div className="h mb-0 space-y-10 px-1">
      {/* Chat ID: {id} */}
      {/* REPLY */}
      <div className="h-4/5 border-0 p-2">
        <div className="grid w-full gap-1.5 mb-10">
          <Label htmlFor="message-2">The Reply</Label>
          <div className="relative h-[40rem] w-full">
            <Textarea
              className="block h-full w-full resize-none rounded-md border-2 p-2 pb-16 pr-10"
              placeholder="The reply will spawn here."
              id="message-2"
              defaultValue={`Chat ID: ${id}`}
              readOnly
              // rows={80}
            />
            {/* // TODO AUDIO IS LOADED */}
            {/* <div className="absolute bottom-2 right-2 px-2 pt-3">
              <audio controls controlsList="nodownload">
                <source />
              </audio>
              </div> */}
            {/* // END TODO  AUDIO IS LOADED */}

            {/* PROMPT TO PLAY AUDIO or TEXT IS EMPTY */}
            <Button className="absolute bottom-2 right-2 rounded-md bg-blue-500 px-3 py-2 text-white">
              <Headphones width={24} height={24} />
            </Button>
            {/* END PROMPT */}
            {/* AUDIO IS LOADING */}
            {/* <div className="absolute bottom-2 right-2 px-2 pt-3">
              <div className="border rounded-lg px-10 py-2 animate-pulse">
                <Play />
              </div>
            </div> */}
            {/* END AUDIO IS LOADING */}
          </div>
          <p className="text-muted-foreground text-sm">
            Your message will appear here.
          </p>
        </div>
      </div>
      {/* PROMPT */}
      <div className="border-0 h-1/5 p-2">
        <div className="relative h-full w-full">
          <Textarea
            className="block h-full w-full resize-none rounded-md border-2 p-2 pr-10"
            placeholder="Ask your question here."
            rows={8}
          />
          <Button className="absolute bottom-2 right-2 rounded-md bg-blue-500 px-3 py-2 text-white">
            <PaperPlaneIcon width={24} height={24} />
          </Button>
          {/* <button className="absolute bottom-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md">
        </button> */}
        </div>
      </div>
    </div>
  );
}
