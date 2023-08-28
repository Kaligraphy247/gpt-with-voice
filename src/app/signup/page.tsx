"use client";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import OTPComponent from "@/app/components/otp-component";
import { useState } from "react";
import Link from "next/link";

const baseApiUrl = process.env["NEXT_PUBLIC_API_URL"];

export default function Signup() {
  const { toast } = useToast();
  const [emailEntered, setEmailEntered] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // check email validity
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);

  const attemptSignup = async () => {
    console.log(emailAddress); //! DEBUG
    setIsLoading(true);
    if (isValidEmail === false) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    // send authentication code
    const form = new FormData();
    form.append("email_address", emailAddress);
    // const result = await fetch(`${baseApiUrl}/new-user`, {
    const result = await fetch(`/api/new-user`, {
      method: "PUT",
      body: form,
    });
    console.log(await result);
    if (result.status === 409) {
      console.log("User already exists");
      toast({
        title: "Signup failed ❌",
        description: "User already exists",
        variant: "destructive",
      });
      setIsLoading(false);
    } else if (result.status === 200) {
      console.log("success"); //! DEBUG
      setTimeout(() => {
        setEmailEntered(true);
      }, 1000);
      // toast
      toast({
        title: "Authentication code sent!",
        description: "Please check your email for the authentication code.",
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Signup failed ❌",
        description: "Some other error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-16 border shadow-md p-2 rounded-md my-20 last:pb-4">
      <div>
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <Label className="text-lg">Email</Label>
        <Input
          className="h-12"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <div className="mt-4">
          {emailAddress === "" ? (
            <Button className="w-full h-12" disabled onClick={attemptSignup}>
              Send Authentication Code
            </Button>
          ) : (
            <Button className="w-full h-12" onClick={attemptSignup}>
              Send Authentication Code
            </Button>
          )}
        </div>
        {/* Login */}
        <div className="text-sm float-right mt-1 mr-0.5">
          <p>
            {"Already have an account? "}
            <Link href={"/login"} className="text-blue-600">
              login
            </Link>
          </p>
        </div>
      </div>

      {/* loading spinner */}
      <div className="text-center" hidden={!isLoading}>
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>

      {/* Auth Code Part */}
      <div
        className={`transition-opacity duration-700  ${
          emailEntered ? "opacity-100" : "opacity-0"
        }`}
      >
        {emailEntered && <OTPComponent email={emailAddress} />}
      </div>
    </div>
  );
}
