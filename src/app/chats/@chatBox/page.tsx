import { ChevronLeftSquareIcon } from "lucide-react";

export default function DefaultChatBox() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border justify-center items-center flex p-4 rounded-lg border-dashed border-gray-300 text-gray-600 dark:border-gray-500 text-center dark:text-gray-300">
        Click<>&nbsp;</><ChevronLeftSquareIcon /><>&nbsp;</>on the right to select a chat
      </div>
    </div>
  );
}
