import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to continue",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
