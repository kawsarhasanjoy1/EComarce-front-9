"use client";

import { authKey } from "@/constanc/authKey";
import { setUser } from "@/redux/api/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiHome, BiLogOut } from "react-icons/bi";
import Cookies from "js-cookie";
import { SideBarItem } from "@/utils/sideBarItem/SideBarItem"; // Normal import

const SideBar = () => {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const HandleToLogOut = () => {
    const res = dispatch(setUser({ user: null, token: null }));
    if (res?.payload?.user === null && res?.payload?.token === null) {
      Cookies.remove(authKey);
      router.push("/");
      toast.success("User LogOut successful");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const isRole = user?.role;

  return (
    <div className="sticky top-0 border px-4 bg-black h-screen text-white space-y-2">
      {isClient && SideBarItem(isRole).map((Item) => (
        <Link
          key={Item?.title}
          className="px-3"
          href={`/dashboard/${Item?.path}`}
        >
          <p
            className={`py-2 rounded-md px-3 shadow-xl font-semibold w-full duration-300 flex items-center gap-2 uppercase text-[12px] truncate border ${
              path === `/dashboard/${Item?.path}`
                ? "bg-[#a2e233]"
                : "bg-transparent"
            }`}
          >
            <Item.icon size={16} className="shrink-0" /> {Item?.title}
          </p>
        </Link>
      ))}
      <hr />
      <Link className="px-3" href={"/"}>
        <p className="py-2 rounded-md px-3 shadow-xl font-semibold w-full hover:bg-transparent duration-300 flex items-center gap-2 uppercase text-[12px] truncate border">
          <BiHome size={16} className="shrink-0" />
          Home
        </p>
      </Link>
      <Link onClick={HandleToLogOut} className="px-3" href={"#"}>
        <p className="py-2 rounded-md px-3 shadow-xl font-semibold w-full hover:bg-transparent duration-300 flex items-center gap-2 uppercase text-[12px] truncate border">
          <BiLogOut size={16} className="shrink-0" />
          LogOut
        </p>
      </Link>
    </div>
  );
};

export default SideBar;
