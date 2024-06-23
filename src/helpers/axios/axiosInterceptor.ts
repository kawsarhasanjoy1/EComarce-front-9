"use client";
import { authKey } from "@/constanc/authKey";
import { logOut } from "@/redux/api/features/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { getCookieToken } from "@/services/action/getCookiesToken";
import axios from "axios";
import { useRouter } from "next/navigation";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  async function (config) {
    const token = await getCookieToken(authKey);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const status = error.response.status;
    if (status === 401 || status === 403) {
      await dispatch(logOut());
      //@ts-ignore
      router("/login");
    }
    return Promise.reject(error);
  }
);

export { instance };
