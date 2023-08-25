import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export async function GET(request: Request) {
  const cookie = cookies().get("access_token");
  // console.log("The cookie: ", cookie);

  if (cookie) {
    cookies().delete(cookie.name)
    return NextResponse.json({
      status: 200
    })
  }

  return NextResponse.json({
    status: 200,
    msg: "Nothing happened 👀"
  })
}