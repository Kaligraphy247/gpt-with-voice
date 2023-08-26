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

  // check email validity
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);

  const attemptSignup = async () => {
    console.log(emailAddress); //! DEBUG
    if (isValidEmail === false) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }
    // send authentication code
    const form = new FormData();
    form.append("email_address", emailAddress);
    const result = await fetch(`${baseApiUrl}/new-user`, {
      method: "PUT",
      body: form,
    });
    if (result.ok) {
      console.log("success"); //! DEBUG
      setTimeout(() => {
        setEmailEntered(true);
      }, 1000);
      toast({
        title: "Authentication code sent!",
        description: "Please check your email for the authentication code.",
      });
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
