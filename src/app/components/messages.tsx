"use client";
import Image from "next/image";

export type MessageListProps = Array<{
  prompt: string;
  reply: string;
  audioUrl?: string;
}>;

export default function Messages({
  messages,
  isAudioLoading,
}: {
  messages: MessageListProps;
  isAudioLoading: boolean;
}) {
  return (
    <div className="border h-4/5 p-0 min-h-[65vh] rounded-sm mt-8">
      {messages.length > 0 ? (
        <div className="grid w-full gap-1.5 mb-0">
          <div className="relative w-full">
            <ul className="border-0 space-y-24 p-4 rounded-sm pb-20 selection:bg-blue-600 selection:text-white dark:selection:bg-blue-700">
              {messages.map((message, index) => (
                <li className="w-full" key={index}>
                  <p className="mb-2 ml-0.5 overflow-auto opacity-75 pl-2 py-1.5 rounded bg-neutral-100 dark:bg-neutral-900">
                    {message.prompt}
                  </p>
                  <div className="w-full border rounded-lg p-2 min-h-[64px] shadow-lg shadow-accent dark:shadow dark:shadow-neutral-900 text-[0.95rem]">
                    {message.reply}
                    {/* <textarea readOnly>{message.audioUrl} </textarea> */}
                  </div>
                  {/* <div className="absolute bottom-2 right-2 px-2 pt-3"> */}
                  <div className="float-right my-3">
                    <audio
                      controls
                      controlsList="nodownload"
                      key={message.audioUrl}
                      // autoPlay
                      autoPlay={messages.length - 1 === index ? true : false}
                    >
                      <source src={message.audioUrl} />
                    </audio>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* // TODO AUDIO IS LOADED */}
          {!isAudioLoading ? (
            <div className="absolute bottom-2 right-2 px-2 pt-3" hidden></div>
          ) : (
            <div className="flex justify-center items-center px-2 pt-3 my-4">
              <div>
                <ReplyLoading />
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex h-[65vh] justify-center items-center">
            <div className="border justify-center items-center flex p-4 rounded-lg border-dashed border-gray-300 text-gray-600 dark:border-gray-500 text-center dark:text-gray-300">
              {"No chat's yet 🤷"}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Renders a loading indicator for audio replies.
 *
 * @return {React.ReactNode} The loading indicator component.
 */
const ReplyLoading: React.FC = (): React.ReactNode => {
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
