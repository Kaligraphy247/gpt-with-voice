import { NextResponse } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

export async function POST(request: Request) {    
    const response = await fetch (`${apiBaseUrl}/confirm-auth-code`, {
    // const response = await fetch (`${apiBaseUrl}/token`, {
        method: request.method,
        body: await request.formData(),
        credentials: "include",
    })

    // get cookies sent from proxied server
    const proxiedCookies = await response.headers.get('Set-cookie');
    // get response data sent from proxied server
    const responseData = await response.json();

    console.log("otherData: ", responseData);
    // if proxiedCookies is NOT set
    if (!proxiedCookies) {
        return NextResponse.json({ status: 400, ok: false });
    }
    // else 
    // const access_token = proxiedCookies?.split(";").at(0)?.split("=")[1] || undefined;
    // const preferredVoice = proxiedCookies?.split(";").at(1)?.split("=")[1] || undefined;
    // console.log(access_token); //! DEBUG
    return new NextResponse(JSON.stringify({done: true, access_token: responseData.access_token, preferredVoice: responseData.preferredVoice}), {
        status: 200,
        headers: {
            'Set-Cookie': proxiedCookies
        }
    })
}
