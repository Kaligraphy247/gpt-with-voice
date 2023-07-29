export default function ChatsLayout(props: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  mainBar: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      <div className="border-0 bg flex">
        <div className="hidden md:w-3/5 md:flex 2xl:w-1/4 xl:w-1/3 bg-gray-950 border mr-6 px-2 py-1 rounded h-[90vh]">
          {props.sidebar}
        </div>
        <div className="border w-full bg p-0.5 rounded">
          {props.mainBar}
        </div>
      </div>
    </>
  );
}
