import { NextResponse } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function PUT(request: Request) {
  const formData = await request.formData();
  // console.log(formData); //! DEBUG

  const result = await fetch(`${apiBaseUrl}/new-user`, {
    method: request.method,
    body: formData,
  });

  const response = await result;
  const responseJson = await response.json();
  // console.dir(response.headers); //! DEBUG

  if (response.status === 409) {
    return new NextResponse(JSON.stringify(responseJson), {
      status: 409,
    });
  }
  if (response.status === 200) {
    // console.log("success"); //! DEBUG
    return new NextResponse(JSON.stringify(responseJson), {
      status: 200,
    });
  }
  // return new NextResponse(JSON.stringify(response));
}
