"use client";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars, FaSun } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import dynamic from "next/dynamic";

const Header = () => {
  const Auth = dynamic(() => import("../Auth"), { ssr: false });
  const [isOpen, setIsOpen] = useState(false);

  const HandleHeader = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" z-20 fixed w-full ">
      <div className=" flex px-3 text-white font-semibold max-w-[1280px] text-[16px]  bg-[#000000] w-full h-14 mx-auto">
        <div className=" flex items-center">
          <Link href={"/"}>
            <p className=" flex items-center gap-1 text-[32px]">
              {/* <p className=" text-xl flex items-center mb-3">Winter</p> */}
              <Image
                className=" flex items-center size-28"
                src="https://askbootstrap.com/preview/eatsie/assets/img/logo.svg"
                alt=""
                width={40}
                height={40}
              />
            </p>
          </Link>
        </div>

        <div className=" w-full  md:z-0 z-20 flex justify-end">
          <div className=" absolute right-2 top-2">
            <span onClick={HandleHeader} className="md:hidden">
              {isOpen ? <AiOutlineClose size={25} /> : <FaBars size={25} />}
            </span>
          </div>
          <ul
            className={` md:flex  items-center justify-end  h-14  gap-10 py-2 absolute  md:space-y-0 space-y-4 ${
              isOpen
                ? "bg-[#000000] z-10 left-0 top-[58px] w-full h-screen px-5 transition-all delay-100 duration-600"
                : "-left-[450px] h-screen md:h-14 md:left-auto "
            }`}
          >
            <li className="group flex  cursor-pointer flex-col">
              <Link href={"/"}>Home</Link>
              <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="group flex  cursor-pointer flex-col">
              <Link href={"/flash-sale"}>Flash Sale</Link>
              <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className="group flex  cursor-pointer flex-col">
              <Link href={"/products"}>Products</Link>
              <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="group flex  cursor-pointer flex-col">
              <Link href={"#"}>About</Link>
              <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="group flex  cursor-pointer flex-col">
              <Link href={"#"}>Contact</Link>
              <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <Auth />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
