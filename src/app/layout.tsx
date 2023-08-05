import "../app/styles/globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "../app/components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import AppBar from "./components/app-bar";
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
  return (
    <html lang="en">
      <body className={openSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppBar />
          <main className="mx-4 md:mx-32 lg:mx-48 xl:mx-80 mb-4">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
