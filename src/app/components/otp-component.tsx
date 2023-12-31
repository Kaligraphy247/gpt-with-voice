"use client";

import { Info, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function OTPComponent(props: { email: string }) {
  // destructure email from props
  const { email } = props;
  const { ...data } = useContext(UserContext);
  const { toast } = useToast();
  const router = useRouter();
  const [isAuthCodeEmpty, setIsAuthCodeEmpty] = useState<boolean>(true);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState<boolean>(true);
  const [inputValues, _setInputValues] = useState({
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
    const result = await fetch(`/api/request-auth-code`, {
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
    setShowLoadingSpinner(false);
    console.log("login"); //! DEBUG
    const code =
      e.target.one.value +
      e.target.two.value +
      e.target.three.value +
      e.target.four.value +
      e.target.five.value +
      e.target.six.value;
    console.log(code); //! DEBUG

    const codeComplete = code.length === 6 ? true : false;
    if (codeComplete) {
      console.log("proceed to auth"); //! DEBUG
      const form = new FormData();
      // append form data
      form.append("auth_code", code);
      form.append("email_address", email);
      // send request
      try {
        const result = await fetch(`/api/authenticate`, {
          method: "POST",
          body: form,
          credentials: "include",
        });

        const response = await result.json();
        console.log(response);

        if (response["access_token"]) {
          setShowLoadingSpinner(true);
          toast({
            title: "Authentication Successful",
            description: "Welcome 🎉",
          });
          // ! update context
          data.setUser({
            email: email,
            token: response["access_token"],
            voicePreference: response["preferredVoice"],
          });
          // !
          // redirect to home page
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 2000);
        } else {
          toast({
            title: "Authentication failed",
            variant: "destructive",
            description: "Authentication code is invalid or expired.",
          });
        }
        // catch block
      } catch (e) {
        toast({
          title: "Request failed",
          variant: "destructive",
          description: `Something went wrong. please try again. \n${String(e)}`,
        });
        console.error("Error", e);
      }
    }
  }

  // START HERE
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
            defaultValue={inputValues.one}
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
          <Button
            type="submit"
            className="w-32 h-12"
            disabled={isAuthCodeEmpty}
          >
            <div hidden={showLoadingSpinner}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
            Login
          </Button>
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
