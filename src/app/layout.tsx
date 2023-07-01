import "./globals.css";
import Recoil from "@/components/Recoil";
import { ReactNode } from "react";
import { AuthWrapper } from "@/components/AuthWrapper";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "회의실 예약 시스템 | 코멘토",
  description: "코멘토의 회의실 예약 시스템입니다.",
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
        <Analytics />
      </body>
    </html>
  );
}
