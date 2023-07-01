"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Database } from "@/lib/database.types";
import { getURL } from "@/utils/url";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getURL()}/auth/callback`,
      },
    });
    router.refresh();
  };

  return (
    <>
      <button className="primary-button px-5 py-2.5" onClick={handleSignUp}>
        구글로 시작하기
      </button>
    </>
  );
}
