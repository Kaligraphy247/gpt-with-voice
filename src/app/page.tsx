import Link from "next/link";
// import SidebarAndMainContent from "./components/side-and-main";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 4_000));
  // const value = Math.random();
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <div className="flex flex-col items-center justify-center p-4 border mt-2 mb-4">
        GPT with Voice
      </div>

      {/* //todo : Separate this into a separate component */}
      <div className="border-0 bg flex">
        {/* SideBar */}
        <div className="hidden md:w-3/5 md:flex 2xl:w-1/4 xl:w-1/3 bg-gray-950 border mr-6 px-2 py-1 rounded h-[90vh]">
          <ul className="w-full space-y-4 py-4">
            <li className="w-full border p-2 rounded-md">
              <Link href={"/chat/42"}>content 1</Link>
            </li>
            <li className="w-full border p-2 rounded-md">
              <Link href={"/chat/69"}>content 1</Link>
            </li>
            <li className="w-full border p-2 rounded-md">
              <Link href={"/chat/another"}>content 1</Link>
            </li>
          </ul>
        </div>
        {/* MainBar */}
        <div className="border w-full bg-gray-800 px-2 py-1 rounded">
          main content
        </div>
      </div>
    </div>
  );
}

// create a component with sidebar and main content
