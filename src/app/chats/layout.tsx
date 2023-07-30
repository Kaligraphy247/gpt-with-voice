import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chats",
  description: "Chats description", // todo should be dynamic
};

export default function ChatsLayout(props: {
  children: React.ReactNode;
  chatBox: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.chatBox}
    </>
  );
}
