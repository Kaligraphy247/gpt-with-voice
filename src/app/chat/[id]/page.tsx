"use client";

import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState, useContext, useEffect } from "react";
import { useToast } from "@/app/components/ui/use-toast";
import { UserContext } from "@/app/components/UserContext";
import Image from "next/image";
import Messages, { MessageListProps } from "@/app/components/messages";
import PromptLogin from "@/app/components/prompt-user-login/prompt-user-login";

/**
 * Renders a chat component.
 *
 * @param {object} params - An object containing the chat parameters.
 * @param {string} params.id - The ID of the chat.
 * @return {JSX.Element} - The rendered chat component.
 */
export default function Chat({ params }: { params: { id: string } }) {
  const id = params.id;
  const { toast } = useToast();
  // get data from context
  const { ...data } = useContext(UserContext);
  // console.log(data.user); //! DEBUG
  const [messagesList, setMessagesList] = useState<MessageListProps>([]);
  const [audioUrl, setAudioUrl] = useState<string | undefined>();
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [sendButtonLoading, setSendButtonLoading] = useState(
    <DefaultSendButton />,
  );

  // get existing messages, if any.
  useEffect(() => {
    const messageHistory =
      typeof window !== "undefined" && window.localStorage.getItem("messages");
    if (messageHistory) {
      setMessagesList(JSON.parse(messageHistory));
    } else {
      window.localStorage.setItem("messages", JSON.stringify([]));
    }
  }, []);

  // Once messageList is updated, save it to local storage
  useEffect(() => {
    typeof window !== "undefined" &&
      window.localStorage.setItem("messages", JSON.stringify(messagesList));
  }, [messagesList]);

  /**
   * Handles the submission of the form.
   *
   * @param {string} prompt - The prompt from the user.
   * @return {Promise<void>} - A promise that resolves when the submission is complete.
   */
  const handleSubmit = async (prompt: string) => {
    // e.preventDefault();
    setIsAudioLoading(true);
    setSendButtonLoading(<LoadingSendButton />); // set send button to loading state
    const form = new FormData();
    let user_prompt = prompt;
    // let voice_choice = "en-US-Studio-O"; //! UNUSED
    // console.log(user_prompt); //! DEBUG
    // console.log(data.user.voicePreference); //! DEBUG
    form.append("user_content", user_prompt);
    form.append(
      "voice_choice",
      data.user.voicePreference?.toString() as string,
    );
    form.append("email_address", data.user.email?.toString() as string);
    form.append("token", data.user.token?.toString() as string);
    try {
      const response = await fetch(`/api/send-prompt`, {
        method: "POST",
        body: form,
      });

      const result = await response.json();
      // console.log(result); //! DEBUG
      if (result) {
        const newMessage: {
          prompt: string;
          reply: string;
          audioUrl?: string | undefined;
        } = {
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
            // add audio src (dataURI) newMessage. Will be used to save in local storage.
            newMessage.audioUrl = dataURI;
            console.log(newMessage); //! DEBUG

            // update the state (an array of messages)
            setMessagesList((prevMessagesList) => [
              ...prevMessagesList,
              newMessage,
            ]);
          }
          setIsAudioLoading(false);
        };
        fileReader.readAsDataURL(audioBlob);

        // todo upload message to chat history db

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
    } catch (e) {
      toast({
        title: "Request failed",
        variant: "destructive",
        description: `Something went wrong. please try again. \n${String(e)}`,
        duration: 5000,
      });
    }
  };

  /**
   * Handles the key down event on the textarea and provides value to be used for `handleSubmit`.
   *
   * @param {React.KeyboardEvent<HTMLTextAreaElement>} e - The keyboard event object.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey && e.key === "Enter") || (e.ctrlKey && e.key === "Enter")) {
      e.preventDefault();
      const prompt = e.currentTarget.value;
      console.log("Prompt: ", prompt); //! DEBUG
      if (prompt !== "") {
        handleSubmit(prompt);
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
    // console.log("Prompt: ", prompt); //! DEBUG
    if (prompt !== "") {
      handleSubmit(prompt);
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
      {data.user.email !== undefined ? (
        <>
          {/* Chat ID: {id} */}
          {/* REPLY */}
          <Messages messages={messagesList} isAudioLoading={isAudioLoading} />
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
        </>
      ) : (
        <PromptLogin />
      )}
    </div>
  );
}

/**
 * Renders a loading indicator for audio replies.
 *
 * @return {React.ReactNode} The loading indicator component.
 */
const ReplyLoading: React.FC = () => {
  return (
    <Image
      src="/audio-loading.svg"
      alt=""
      className="dark:invert"
      width={64}
      height={64}
    />
  );
};

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
