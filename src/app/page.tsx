"use client";

import { useRecoilValue } from "recoil";
import Login from "./login";
import { getUserInfo } from "@/atoms/auth";
import { UserInfo } from "@/types/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const userInfo = useRecoilValue<UserInfo>(getUserInfo);
  if (userInfo) {
    redirect("/calendar");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <h1 className="text-2xl text-black mb-4">코멘토 회의실 예약 시스템</h1>
      <Image
        src="https://olpvsxmuscjzgohdzmsy.supabase.co/storage/v1/object/public/public/main-image.png"
        width={500}
        height={500}
        className="rounded-lg mb-4"
        alt="회의실 이미지"
      />
      <Login />
    </main>
  );
}
