import { NextResponse } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request, rep: NextResponse) {
  const formData = await request.formData();
  // console.log(formData); //! DEBUG
  const result = await fetch(`${apiBaseUrl}/chatgpt-text-voice`, {
    method: "POST",
    body: formData,
  });
  const response = await result.json();
  // console.log(response) //! DEBUG

  if (!response) {
    return new NextResponse(JSON.stringify(null), {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify(response), { status: 200 });
}
