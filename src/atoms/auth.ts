import { UserInfo } from "@/types/auth";
import { atom, selector } from "recoil";

export const authState = atom<UserInfo>({
  key: "authState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const getUserInfo = selector<UserInfo>({
  key: "getUserInfo",
  get: ({ get }) => {
    const auth = get(authState);
    return auth;
  },
});
