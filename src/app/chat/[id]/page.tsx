"use client";

import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Headphones, Play } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/app/components/ui/use-toast";


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

  const pushToChat = async (e: any) => {
    e.preventDefault();
    // console.log(e.target.userPrompt.value);
    messages.push({
      prompt: e.target.userPrompt.value,
      reply: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias?",
    })
    // e.target.userPrompt.value
    console.log(messages)
  }
  
  return (
    <div className="mb-0 space-y-10 px-1">
      {/* Chat ID: {id} */}
      <div className="text-red-600 font-extrabold animate-pulse text-2xl border-8 border-blue-600 p-2 rounded-full">
        Only visible on hard navigation
      </div>
      {/* REPLY */}
      <div className="border h-4/5 p-0 min-h-[65vh] rounded-sm mt-8">
        <div className="grid w-full gap-1.5 mb-0">
          <div className="relative w-full">
            <ul className="border-0 space-y-16 p-4 rounded-sm pb-20 selection:bg-blue-600 selection:text-white dark:selection:bg-blue-700">
              {messages.map((message, index) => (
                <li className="w-full" key={index}>
                  <p className="mb-2 ml-0.5 overflow-auto opacity-75 pl-2 py-1 rounded bg-neutral-100 dark:bg-neutral-900">{message.prompt}</p>
                  <div className="w-full border rounded-lg p-2 min-h-[64px] shadow-md shadow-accent dark:shadow dark:shadow-neutral-900 text-[0.95rem]">{message.reply}</div>
                </li>
              ))}
            </ul>
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
        </div>
      </div>
      {/* PROMPT */}
      <div className="border-0 h-1/5 p-0">
        <form
          className="relative h-full w-full"
          onSubmit={pushToChat}
          // onSubmit={handleSubmitObfuscated}
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




const messages = [
  {
    prompt: "message one prompt will be displayed here",
    reply: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias?"
  },
  {
    prompt: "message two prompt will be displayed here",
    reply: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias? "
  },
  {
    prompt: "message three prompt will be displayed here",
    reply: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias?"
  },
  {
    prompt: "message four prompt will be displayed here",
    reply: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias?"
  },
  {
    prompt: "message five prompt will be displayed here",
    reply: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias?"
  },
  {
    prompt: "message six prompt will be displayed here",
    reply: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias? Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias?"
  },
  {
    prompt: "message seven prompt will be displayed here",
    reply: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias? repellendus minima maiores molestias?"
  },
  {
    prompt: "message eight prompt will be displayed here",
    reply: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias? Sunt et pariatur cupiditate modi repellendus minima maiores molestias?"
  },
  {
    prompt: "message nine prompt will be displayed here",
    reply: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, iLorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias? nventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias?"
  },
  {
    prompt: "message ten prompt will be displayed here",
    reply: "Lorem ipsum dolor sit,  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias? amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias?"
  }
]


{/* <li className="w-full">
  <p className="mb-2 ml-0.5 overflow-auto opacity-80">message one prompt will be displayed here</p>
  <div className="w-full border rounded-lg p-2 min-h-[64px] shadow-md shadow-accent dark:shadow dark:shadow-neutral-900 text-[0.95rem] hover:cursor-grab">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias?</div>
</li> */}