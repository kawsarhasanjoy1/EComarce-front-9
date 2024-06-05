import { authKey } from "@/constanc/authKey";
import { setUser } from "@/redux/api/features/authSlice";
import { setMode } from "@/redux/api/features/modeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import React from "react";
import { HiOutlineMoon } from "react-icons/hi";
import { IoSunnyOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import Cookies from "js-cookie";

const Auth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store?.auth.user);
  const { mode } = useAppSelector((store) => store.mode);

  const order = useAppSelector((store) => store?.order?.order);
  const HandleToLogOut = () => {
    localStorage.removeItem(authKey);
    Cookies.remove(authKey);
    dispatch(setUser({ user: null, token: null }));
  };
  const HandleToMode = () => {
    dispatch(setMode());
  };
  const isAdmin = "admin";
  return (
    <div className=" md:flex gap-10 justify-center items-center space-y-4 md:space-y-0">
      <li className="group flex  cursor-pointer flex-col">
        <Link href={`/dashboard/${isAdmin}`}>Dashboard</Link>
        <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
      </li>
      <li className="group flex  cursor-pointer flex-col relative">
        <Link href={"/checkout"}>
          <p className=" absolute md:-top-3 md:-right-6 left-6 text-[12px] bg-[#a2e233] px-3 rounded-full">
            {order?.length}
          </p>
          <MdAddShoppingCart size={20} />{" "}
        </Link>
        <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
      </li>
      <li
        onClick={HandleToMode}
        className="group flex  cursor-pointer flex-col"
      >
        {mode ? <IoSunnyOutline size={25} /> : <HiOutlineMoon size={25} />}
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
      </li>

      {user ? (
        <li className="group flex  cursor-pointer flex-col justify-start items-start">
          <button onClick={() => HandleToLogOut()}>LogOut</button>
          <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
        </li>
      ) : (
        <div className=" md:flex items-center gap-10 space-y-4 md:space-y-0">
          <li className="group flex  cursor-pointer flex-col">
            <Link href={"/login"}>Login</Link>
            <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="group flex  cursor-pointer flex-col">
            <Link href={"/register"}>Register</Link>
            <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
        </div>
      )}
    </div>
  );
};

export default Auth;
