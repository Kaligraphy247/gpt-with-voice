export default async function Chat({params}: {params: {id: string}}) {
    const id = params.id
    return (
        <div className="border border-red-500 w-full">Chat ID: {id}</div>
    )
}