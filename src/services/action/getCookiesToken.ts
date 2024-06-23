"use server";
import { cookies } from "next/headers";

export const getCookieToken = async(key: string) => {
  return await cookies().get(key)?.value || null;
};
