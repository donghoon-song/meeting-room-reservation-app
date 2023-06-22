"use client";

import { useRecoilValue } from "recoil";
import Login from "./login";
import { getUserInfo } from "@/atoms/auth";
import { UserInfo } from "@/types/auth";
import { redirect } from "next/navigation";

export default function Home() {
  const userInfo = useRecoilValue<UserInfo>(getUserInfo);
  if (userInfo) {
    redirect("/calendar");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Login />
    </main>
  );
}
