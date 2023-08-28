import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to get started",
};

export default async function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
