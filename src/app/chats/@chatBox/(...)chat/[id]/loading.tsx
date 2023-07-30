export default function Loading() {
  return (
    <div className="animate-pulse mb-0 space-y-10 px-1">
      {/* REPLY */}
      <div className="h-4/5 border-0 p-2">
        <div className="grid w-full gap-1.5 mb-10">
          <div className="relative h-[40rem] w-full">
            <div className="block h-full w-full resize-none rounded-md border-2 p-2 pb-16 pr-10 bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <p className="text-muted-foreground text-sm hidden">
            Your message will appear here.
          </p>
        </div>
      </div>
      {/* PROMPT */}
      <div className="border-0 h-1/5 p-2">
        <div className="relative h-full w-full">
          <div className="block h-32 w-full resize-none rounded-md border-2 p-2 pr-10 bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}
