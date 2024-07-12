import Link from "next/link";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg text-black md:p-8 h-screen w-full flex flex-col justify-center items-center">
      <div className=" text-center mx-auto space-y-6">
        <svg
        className=" mx-auto"
          width={75}
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          {" "}
          <g strokeWidth="0"></g>{" "}
          <g id="navgateui" strokeLinecap="round" strokeLinejoin="round"></g>{" "}
          <g id="navgateui">
            <path
              fill="#16BAC5"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
            ></path>
          </g>
        </svg>
        <h6 className="text-center text-3xl font-medium text-slate-700 pb-4">
          Cart is Empty
        </h6>
        <Link href={"/"}>
          <button className="rounded-full bg-[#16BAC5] px-6 py-2 text-white ">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
