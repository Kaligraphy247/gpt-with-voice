"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OTPComponent(props: { email: string }) {
  // destructure email from props
  const { email } = props;
  const { toast } = useToast();
  const router = useRouter();
  const [isAuthCodeEmpty, setIsAuthCodeEmpty] = useState<boolean>(true);
  const [inputValues, setInputValues] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });

  // add event listener for paste
  document.addEventListener("paste", (event) => {
    const pastedCode = event.clipboardData?.getData("text");
    const parentDiv = document.getElementById("otp-input");
    const inputFields = parentDiv?.querySelectorAll("input");

    if (pastedCode?.length === inputFields?.length) {
      inputFields?.forEach((input, index) => {
        input.value = pastedCode![index];
      });
    }

    setIsAuthCodeEmpty(false);
  });

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const maxLength = parseInt(input.getAttribute("maxlength") || "0", 10);
    const value = input.value;

    if (value.length === maxLength) {
      const nextInput = input.nextElementSibling as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
      } else {
        setIsAuthCodeEmpty(false);
      }
    }
  }

  async function resendAuthenticationCode() {
    const form = new FormData();
    form.append("email_address", email);
    const result = await fetch("http://localhost:8000/auth-by-email", {
      method: "POST",
      body: form,
    });
    if (result.ok) {
      toast({
        title: "Authentication code resent",
        description:
          "Please check your email for the authentication code. Don't forget to check your spam/junk folder.",
      });
    }
  }

  async function login(e: any) {
    e.preventDefault();
    console.log("login"); //! DEBUG
    const code =
      e.target.one.value +
      e.target.two.value +
      e.target.three.value +
      e.target.four.value +
      e.target.five.value +
      e.target.six.value;
    console.log(code); //! DEBUG

    if (code.length === 6) {
      console.log("proceed to auth"); //! DEBUG
      const form = new FormData();
      // append form data
      form.append("auth_code", code);
      form.append("email_address", email);
      // send request
      const result = await fetch("http://localhost:8000/confirm-auth-code", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      console.log(result); //! DEBUG

      if (result.ok) {
        toast({
          title: "Authentication Successful",
          description: "You have successfully logged in.",
        });

        // redirect to home page
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        toast({
          title: "Authentication failed",
          variant: "destructive",
          description: "Authentication code is invalid or expired.",
        });
      }
    } else if (code.length < 6) {
      toast({
        title: "Incomplete Authentication code",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <h1 className="text-lg font-medium text-center px-2">
        Enter the authentication code that was sent to{" "}
        <span className="text-blue-600">
          {email === "" ? "your email" : email}
        </span>
        {"."}
      </h1>

      {/* Form Part */}
      <form onSubmit={login}>
        <div
          className="flex flex-row space-x-2 md:space-x-4 justify-center mt-4"
          id="otp-input"
        >
          <Input
            className="w-12 h-12 text-center"
            maxLength={1}
            onInput={handleInput}
            name="one"
          />
          <Input
            className="w-12 h-12 text-center"
            maxLength={1}
            onInput={handleInput}
            name="two"
          />
          <Input
            className="w-12 h-12 text-center"
            maxLength={1}
            onInput={handleInput}
            name="three"
          />
          <Input
            className="w-12 h-12 text-center"
            maxLength={1}
            onInput={handleInput}
            name="four"
          />
          <Input
            className="w-12 h-12 text-center"
            maxLength={1}
            onInput={handleInput}
            name="five"
          />
          <Input
            className="w-12 h-12 text-center"
            maxLength={1}
            onInput={handleInput}
            name="six"
          />
        </div>
        {/* tip */}
        <div className="my-0 flex flex-col justify-center items-center">
          <p className="text-muted-foreground text-[0.680rem] flex flex-row dark:text-neutral-100">
            <Info
              size={12}
              className="mt-[3px] mr-1 text-black dark:text-white"
            />
            {
              "Tip: You can paste the authentication code to automatically fill in."
            }
          </p>
        </div>
        <div className="flex justify-center mt-4">
          {isAuthCodeEmpty ? (
            <Button type="submit" className="w-32 h-12" disabled>
              Login
            </Button>
          ) : (
            <Button type="submit" className="w-32 h-12">
              Login
            </Button>
          )}
        </div>
      </form>
      <div className="my-4 flex flex-col justify-center items-center">
        <div>
          {"Didn't receive a code? "}
          <Button
            className="p-0 text-base text-blue-600 pl-0.5"
            type="button"
            variant={"link"}
            onClick={resendAuthenticationCode}
          >
            Resend code
          </Button>
          {"."}
        </div>
        <p className="text-muted-foreground text-[0.750rem] flex flex-row">
          <Info size={12} className="mt-[3px] mr-1 text-dark dark:text-white" />
          {"Don't forget to check spam/junk folders."}
        </p>
      </div>
    </div>
  );
}
