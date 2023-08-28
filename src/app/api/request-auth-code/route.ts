import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(request: Request, rep: NextResponse) {
    const formData = await request.formData();
    // const email = formData.get("email_address");
    console.log(formData); //! DEBUG
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
    const result = await fetch(`${apiBaseUrl}/send-auth-code`, {
        method: "POST",
        body: formData,
    })
    const response = await result.json();
    // console.log(response) //! DEBUG

    if (!response) {
        return new NextResponse(JSON.stringify(response), {
        status: 200
    })
    }
    
    return new NextResponse(JSON.stringify(response), {
        status: 200
    })
    // return NextResponse.json({ status: 200,});
}