import "./globals.css";
import Recoil from "@/components/Recoil";
import { ReactNode } from "react";
import { AuthWrapper } from "@/components/AuthWrapper";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Recoil>
          <AuthWrapper>{children}</AuthWrapper>
        </Recoil>
      </body>
    </html>
  );
}
