import Link from "next/link";

export default async function SideBar() {
  //   await new Promise((resolve) => setTimeout(resolve, 7_000));
  return (
    // <div>
    //   List of contents
    // </div>
    <>
      <ul className="w-full space-y-4 py-4">
        <li className="w-full border p-2 rounded-md">
          <Link href={"/chat/42"}>content 42</Link>
        </li>
        <li className="w-full border p-2 rounded-md">
          <Link href={"/chat/69"}>content 69</Link>
        </li>
        <li className="w-full border p-2 rounded-md">
          <Link href={"/chat/another"}>content another</Link>
        </li>
      </ul>
    </>
  );
}

{
  /* <div className="hidden md:w-3/5 md:flex 2xl:w-1/4 xl:w-1/3 bg-gray-950 border mr-6 px-2 py-1 rounded h-[90vh]">
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
</div> */
}
