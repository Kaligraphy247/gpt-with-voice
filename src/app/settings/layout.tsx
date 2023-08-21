import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Do your settings and stuff here 👀",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}