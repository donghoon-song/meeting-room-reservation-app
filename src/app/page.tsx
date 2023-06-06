"use client";

import Image from "next/image";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Login from "./login";

async function googleSignin() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
}

export default function Home() {
  const [session, setSession] = useState<User | null>(null);

  useEffect(() => {
    const user = supabase.auth.getUser().then((user) => {
      setSession(user.data.user);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session?.user || null);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Login />
      <div>{JSON.stringify(session)}</div>
    </main>
  );
}
