import { NextResponse } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  const response = await fetch(`${apiBaseUrl}/confirm-auth-code`, {
    // const response = await fetch (`${apiBaseUrl}/token`, {
    method: request.method,
    body: await request.formData(),
    credentials: "include",
  });

  // get cookies sent from proxied server
  const proxiedCookies = await response.headers.get("Set-cookie");
  // get response data sent from proxied server
  const responseData = await response.json();

  // if proxiedCookies is NOT set
  if (!proxiedCookies) {
    return new NextResponse(JSON.stringify({ status: 400, ok: false }), {
      status: 400,
    });
  }
  // else
  return new NextResponse(
    JSON.stringify({
      done: true,
      access_token: responseData.access_token,
      preferredVoice: responseData.preferredVoice,
    }),
    {
      status: 200,
      headers: {
        "Set-Cookie": proxiedCookies,
      },
    },
  );
}
