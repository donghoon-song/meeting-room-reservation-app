"use client";

import Login from "./login";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { authState } from "@/atoms/auth";
import { UserInfo } from "@/types/auth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(authState);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserInfo(user);
      }
    };
    fetchUserInfo();

    supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_IN" && session) {
        setUserInfo(session.user);
        router.push("/calendar");
      }
    });
  }, [setUserInfo, router, supabase.auth]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Login />
    </main>
  );
}
