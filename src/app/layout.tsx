import "../app/styles/globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "../app/components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { cookies } from "next/headers";
import AppContextWrapper from "@/app/components/context-wrapper";
import AppBar from "./components/app-bar";
import { User } from "./components/UserContext";

// font
const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GPT with Voice",
  description: "Add voice capabilities to chatGPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ? if said cookie exists, then user is logged in?
  const cookieJar = cookies();
  const userToken =
    cookieJar.get("access_token") !== undefined ||
    cookieJar.get("access_token") !== null
      ? cookieJar.get("access_token")?.value
      : null || undefined;
  // console.log(userToken)
  // ? END

  // const data: User = { email: null, token: userToken, voicePreference: null };
  const data: User = {};

  return (
    <html lang="en">
      <body className={openSans.className}>
        {/* <AppContextWrapper context={{token: "default", authenticatedEmail: "default email"}}> */}
        <AppContextWrapper context={data}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppBar />
            <main className="mx-4 md:mx-32 lg:mx-48 xl:mx-80 mb-4">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </AppContextWrapper>
      </body>
    </html>
  );
}
