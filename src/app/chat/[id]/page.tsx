"use client";

import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Headphones, Play } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/app/components/ui/use-toast";

/**
 * Renders a chat component.
 *
 * @param {object} params - An object containing the chat parameters.
 * @param {string} params.id - The ID of the chat.
 * @return {JSX.Element} - The rendered chat component.
 */
export default function Chat({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const id = params.id;
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<
    Array<{ prompt: string; reply: string }>
  >([]);
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

      // reset input
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

  /**
   * Handles the submission of the form.
   *
   * @param {string} prompt - The prompt from the user.
   * @return {Promise<void>} - A promise that resolves when the submission is complete.
   */
  const handleSubmitV2 = async (prompt: string) => {
    // e.preventDefault();
    setIsAudioLoading(true);
    setSendButtonLoading(<LoadingSendButton />); // set send button to loading state
    const form = new FormData();
    let user_prompt = prompt;
    console.log(user_prompt); //! DEBUG
    form.append("user_content", user_prompt);
    const response = await fetch("http://localhost:8000/full", {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    console.log(result);
    if (result) {
      // setMessagesList(result.message.content);
      const newMessage = {
        prompt: prompt,
        reply: result.message.content,
      };

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

      // update the state (an array of messages)
      setMessagesList((prevMessagesList) => [...prevMessagesList, newMessage]);
      // todo upload message to chat history db

      // // reset input
      // e.target.userPrompt.value = "";
      // set loading state back to default
      setSendButtonLoading(<DefaultSendButton />);
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
    const newMessage = {
      prompt: e.target.userPrompt.value,
      reply:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem qui molestias, mollitia possimus error veniam eveniet, inventore, quod quisquam officiis. Sunt et pariatur cupiditate modi repellendus minima maiores molestias?",
    };
    // update the state (an array of messages)
    setMessagesList((prevMessagesList) => [...prevMessagesList, newMessage]);
    // console.log(messagesList)
  };

  /**
   * Handles the key down event on the textarea and provides value to be used for `handleSubmitV2`.
   *
   * @param {React.KeyboardEvent<HTMLTextAreaElement>} e - The keyboard event object.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (e.metaKey && e.key === "Enter") ||
      (e.ctrlKey && e.key === "Enter") ||
      e.type === "submit"
    ) {
      e.preventDefault();
      const prompt = e.currentTarget.value;
      console.log("Prompt: ", prompt); //! DEBUG
      if (prompt !== "") {
        handleSubmitV2(prompt);
      } else {
        toast({
          title: "Prompt cannot be empty",
          variant: "destructive",
        });
      }
      // reset input
      e.currentTarget.value = "";
    }
  };

  /**
   * Handles the form submission when the send button is clicked.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @return {void} This function does not return anything.
   */
  const handleSendButtonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const prompt = (e.target as HTMLFormElement).userPrompt.value;
    console.log("Prompt: ", prompt); //! DEBUG
    if (prompt !== "") {
      handleSubmitV2(prompt);
      // console.log("Not empty") //! DEBUG
    } else {
      toast({
        title: "Prompt cannot be empty",
        variant: "destructive",
      });
    }

    // reset input
    e.currentTarget.value = "";
  };

  return (
    <div className="mb-0 space-y-10 px-1">
      {/* Chat ID: {id} */}
      <div className="text-red-600 font-extrabold animate-pulse text-2xl border-8 border-blue-600 p-2 rounded-full">
        Only visible on hard navigation
      </div>
      {/* REPLY */}
      <div className="border h-4/5 p-0 min-h-[65vh] rounded-sm mt-8">
        {messagesList.length > 0 ? (
          <div className="grid w-full gap-1.5 mb-0">
            <div className="relative w-full">
              <ul className="border-0 space-y-16 p-4 rounded-sm pb-20 selection:bg-blue-600 selection:text-white dark:selection:bg-blue-700">
                {messagesList.map((message, index) => (
                  <li className="w-full" key={index}>
                    <p className="mb-2 ml-0.5 overflow-auto opacity-75 pl-2 py-1 rounded bg-neutral-100 dark:bg-neutral-900">
                      {message.prompt}
                    </p>
                    <div className="w-full border rounded-lg p-2 min-h-[64px] shadow-lg shadow-accent dark:shadow dark:shadow-neutral-900 text-[0.95rem]">
                      {message.reply}
                    </div>
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
        ) : (
          <>
            <div className="flex h-[65vh] justify-center items-center">
              <div className="border justify-center items-center flex p-4 rounded-lg border-dashed border-gray-300 text-gray-600 dark:border-gray-500 text-center dark:text-gray-300">
                No chat's yet 🤷
              </div>
            </div>
          </>
        )}
      </div>
      {/* PROMPT */}
      <div className="border-0 h-1/5 p-0">
        <form
          className="relative h-full w-full"
          onSubmit={handleSendButtonSubmit}
        >
          <Textarea
            className="block h-full w-full resize-none rounded-md border-2 p-2 pr-10"
            placeholder="Ask your question here."
            rows={8}
            name="userPrompt"
            onKeyDown={handleKeyDown}
          />
          {sendButtonLoading}
        </form>
      </div>
    </div>
  );
}

/**
 * Renders a default send button component.
 *
 * @return {JSX.Element} The rendered send button component.
 */
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

/**
 * Renders a loading send button component.
 *
 * @return {JSX.Element} The loading send button component.
 */
const LoadingSendButton = () => {
  return (
    <Button
      className="absolute bottom-2 right-2 rounded-md bg-gray-500 px-3 py-2 text-white opacity-50"
      type="submit"
      disabled
    >
      <PaperPlaneIcon width={24} height={24} />
    </Button>
  );
};
