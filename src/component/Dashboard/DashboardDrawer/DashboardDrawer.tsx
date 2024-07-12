"use client";
import Avatar from "@/component/Avatar";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import SideBar from "../SideBar/SideBar";

const DashboardDrawer = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className=" sticky top-0 bg-gradient bg-black flex justify-between  items-center z-50 px-5">
        <div className=" flex items-center">
          <Link href={"/"}>
            <p className=" flex items-center gap-1 text-[32px]">
              {/* <p className=" text-xl flex items-center mb-3">Winter</p> */}
              <Image
                className=" flex items-center size-16"
                src="https://askbootstrap.com/preview/eatsie/assets/img/logo.svg"
                alt=""
                width={40}
                height={40}
              />
            </p>
          </Link>
        </div>
        <Link href={""}>
          <Avatar />
        </Link>
      </div>
      <div className=" grid grid-cols-12">
        <div className=" sticky top-0 col-span-2">
          <SideBar />
        </div>
        <div className=" col-span-10 md:mx-10 mx-2 overflow-auto ">
          {" "}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardDrawer;
