export default async function Chat({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <div className="border border-red-500 w-full">
      <p>This part will only show on hard navigation</p>
      <p>Chat ID: {id}</p>
    </div>
  );
}
