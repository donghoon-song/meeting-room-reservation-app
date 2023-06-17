"use client";

import { authState } from "@/atoms/auth";
import { UserInfo } from "@/types/auth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";

type Props = {
  children: ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(authState);
  const supabase = createClientComponentClient();

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
  }, [setUserInfo, supabase.auth]);

  return <>{children}</>;
};
