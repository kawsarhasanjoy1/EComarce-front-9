import { setMode } from "@/redux/api/features/modeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { HiOutlineMoon } from "react-icons/hi";
import { IoSunnyOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { TOrder } from "@/Types/Global";
import logOutUser from "@/services/action/logOut";
import { useRouter } from "next/navigation";
import { logOut } from "@/redux/api/features/authSlice";
import { getCookieToken } from "@/services/action/getCookiesToken";
import { authKey } from "@/constanc/authKey";
import { useEffect, useState } from "react";

const Auth = () => {
  const [cookieToken, setCookieToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getCookieToken(authKey);
      setCookieToken(token as any);
    };

    fetchToken();
  }, []);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store?.auth);
  const { mode } = useAppSelector((store) => store.mode);
  const order = useAppSelector((store) => store?.order?.order);
  const HandleToLogOut = () => {
    dispatch(logOut());
    logOutUser(router);
  };
  const HandleToMode = () => {
    dispatch(setMode());
  };

  const filter = order?.filter((item: TOrder) => item?.email == user?.email);
  const isAdmin = user?.role;
  return (
    <div className=" md:flex gap-10 justify-center items-center space-y-4 md:space-y-0">
      <li className="group flex  cursor-pointer flex-col">
        <Link href={`/dashboard/${isAdmin}`}>Dashboard</Link>
        <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
      </li>
      <li className="group flex  cursor-pointer flex-col relative">
        <Link href={"/checkout"}>
          <p className=" absolute md:-top-3 md:-right-6 left-6 text-[12px] bg-[#a2e233] px-3 rounded-full">
            {filter?.length}
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

      {user && cookieToken ? (
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
