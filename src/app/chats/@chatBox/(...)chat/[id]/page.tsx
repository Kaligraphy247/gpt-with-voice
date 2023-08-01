"use client";

import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { useToast } from "@/app/components/ui/use-toast";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Headphones, Play } from "lucide-react";
import { useState } from "react";

export default function Chat({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const id = params.id;
  const [message, setMessage] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | undefined>();
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [sendButtonLoading, setSendButtonLoading] = useState(
    <DefaultSendButton />,
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // ! set isAudioLoading to true
    setIsAudioLoading(true);
    setSendButtonLoading(<LoadingSendButton />); // set send button to loading state
    const form = new FormData();
    let user_prompt = e.target.userPrompt.value;
    console.log(user_prompt);
    form.append("user_content", user_prompt);
    const response = await fetch("http://localhost:8000/full", {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    console.log(result); //! DEBUG
    if (result) {
      setMessage(result.message.content);
      setAudioUrl(result.audio);
      setIsAudioLoading(false);
      // ! clear input after successful submission
      e.target.userPrompt.value = "";
      setSendButtonLoading(<DefaultSendButton />); // set loading state back to default
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong. please try again.",
        duration: 5000,
      });
    }
  };

  const handleSubmitObfuscated = async (e: any) => {
    e.preventDefault();
    setIsAudioLoading(true);
    setSendButtonLoading(<LoadingSendButton />); // set send button to loading state
    const form = new FormData();
    let user_prompt = e.target.userPrompt.value;
    console.log(user_prompt);
    form.append("user_content", user_prompt);
    const response = await fetch("http://localhost:8000/full", {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    console.log(result);
    if (result) {
      setMessage(result.message.content);
      // Convert audioUrl to data URI
      const audioResponse = await fetch(result.audio);
      const audioBlob = await audioResponse.blob();
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const dataURI = event.target!.result;
        if (typeof dataURI === "string") {
          setAudioUrl(dataURI);
        }
        setIsAudioLoading(false);
      };
      fileReader.readAsDataURL(audioBlob);

      e.target.userPrompt.value = "";
      setSendButtonLoading(<DefaultSendButton />); // set loading state back to default
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong. please try again.",
        duration: 5000,
      });
    }
  };


  return (
    <div className="h mb-0 space-y-10 px-1">
      {/* REPLY */}
      <div className="h-4/5 border-0 p-2">
        <div className="grid w-full gap-1.5 mb-10">
          <Label htmlFor="message-2">The Reply</Label>
          <div className="relative h-[40rem] w-full">
            <Textarea
              className="block h-full w-full resize-none rounded-md border-2 p-2 pb-16 pr-10"
              placeholder="The reply will spawn here."
              id="message-2"
              // defaultValue={`Chat ID: ${id}`}
              defaultValue={message}
              readOnly
              // rows={80}
            />
            {/* // TODO AUDIO IS LOADED */}
            {!isAudioLoading ? (
              <div className="absolute bottom-2 right-2 px-2 pt-3">
                <audio
                  controls
                  controlsList="nodownload"
                  key={audioUrl}
                  autoPlay
                >
                  <source src={audioUrl} />
                </audio>
              </div>
            ) : (
              <div className="absolute bottom-2 right-2 px-2 pt-3">
                <div className="border rounded-lg px-10 py-2 animate-pulse">
                  <Play />
                </div>
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            Your message will appear here.
          </p>
        </div>
      </div>
      {/* PROMPT */}
      <div className="border-0 h-1/5 p-2">
        <form
          className="relative h-full w-full"
          onSubmit={handleSubmitObfuscated}
        >
          <Textarea
            className="block h-full w-full resize-none rounded-md border-2 p-2 pr-10"
            placeholder="Ask your question here."
            rows={8}
            name="userPrompt"
          />
          {sendButtonLoading}
        </form>
      </div>
    </div>
  );
}

const DefaultSendButton = () => {
  return (
    <Button
      className="absolute bottom-2 right-2 rounded-md bg-blue-500 px-3 py-2 text-white"
      type="submit"
    >
      <PaperPlaneIcon width={24} height={24} />
    </Button>
  );
};

const LoadingSendButton = () => {
  return (
    <Button
      className="absolute bottom-2 right-2 rounded-md bg-gray-500 px-3 py-2 text-white opacity-50"
      type="submit"
    >
      <PaperPlaneIcon width={24} height={24} />
    </Button>
  );
};