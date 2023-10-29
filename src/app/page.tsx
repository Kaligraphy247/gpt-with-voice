import Link from "next/link";
import { CornerDownLeft, Command, Info } from "lucide-react";
// import SidebarAndMainContent from "./components/side-and-main";

export default async function Home() {
  // await new Promise((resolve) => setTimeout(resolve, 4_000));
  // const value = Math.random();
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="my-20">
      <Description />
      <LandingPage />
      <OtherInfo />
    </div>
  );
}

function Description() {
  return (
    <div className="py-0">
      <h1 className="text-3xl font-bold text-center py-4">
        ChatGPT with Voice
      </h1>
      <h2 className="text-2xl font-bold mb-2">Description</h2>
      <div>
        <p className="indent-8">
          {`ChatGPT with Voice is a web app that lets you listen to your prompt reply. `}
          It uses{" "}
          <Link
            href={"https://cloud.google.com/text-to-speech"}
            className="text-blue-600"
            target="_blank"
          >
            {"Google's Text to Speech API "}
          </Link>
          to convert the result of your prompt into an audio format.
        </p>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="my-8 py-4">
      <h2 className="text-2xl font-bold mb-2">Getting started</h2>
      <ul className="list-inside space-y-3">
        <li className="list-disc">
          <Link href={"/signup"} className="text-blue-600">
            {"Sign up "}
          </Link>
          {"if you don't have an account, else"}
          <Link href={"/login"} className="text-blue-600">
            {" Login."}
          </Link>
        </li>
        <li className="list-disc">
          Go to
          <Link href={"/chats"} className="text-blue-600">
            {" Chats."}
          </Link>
        </li>
        <li className="list-disc">
          Write prompt - click the <span>Send</span> button to send.
        </li>
      </ul>
    </div>
  );
}

function OtherInfo() {
  return (
    <div className="">
      <h2 className="text-xl font-bold pb-1">
        {"The app is functional however the most settings does't work, like:"}
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>OpenAI secret is not functional.</li>
        <li>
          Switching Voices is not functional: the default voice is set and
          changing it does not do anything. You can always play the sample
          voices.
        </li>
        <li className="font-bold">
          Chat history is saved on your device and is cleared upon logout. If
          you notice performance issues, please logout or start a new chat.
        </li>
        <li>
          {
            "Prompt reply is limited to a single paragraph. It's better for performance."
          }
        </li>
      </ul>
    </div>
  );
}
