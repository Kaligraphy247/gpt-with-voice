import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat description",
};

export default function ChatLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
