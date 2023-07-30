import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat description",
};

export default function ChatsLayout(props: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  mainBar: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      <div className="border-0 bg flex min-h-screen">
        <div className="hidden md:w-3/5 md:flex 2xl:w-1/4 xl:w-1/3 bg-gray-50 border mr-6 px-2 py-1 rounded  dark:bg-gray-950">
          {props.sidebar}
        </div>
        <div className="border w-full p-0.5 rounded">{props.mainBar}</div>
      </div>
    </>
  );
}
