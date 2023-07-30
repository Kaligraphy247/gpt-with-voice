import { resolve } from "path";
import CollapsibleSidebar from "./collapsible-sidebar";

export default async function Chats() {
  // test loading animation
  // await new Promise((resolve) => setTimeout(resolve, 40_000));
  return (
    <>
      <CollapsibleSidebar />
    </>
  );
}
