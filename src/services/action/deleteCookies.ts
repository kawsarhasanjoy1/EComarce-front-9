"use server";
import { cookies } from "next/headers";

export const deleteCookies = async (key: string) => {
  cookies().delete(key);
};
