import CollapsibleSidebar from "./collapsible-sidebar";
import { wait } from "../components/wait";

export default async function Chats() {
  // test loading animation
  // await wait(4_000);
  return (
    <>
      <CollapsibleSidebar />
    </>
  );
}
