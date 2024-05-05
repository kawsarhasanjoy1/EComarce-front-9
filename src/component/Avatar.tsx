"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Avatar = () => {
  const [open, setOpen] = useState(false);
  const dropDownRef: any = useRef(null);
  const items = ["Profile", "Dashboard", "Settings", "Log Out"];

  useEffect(() => {
    const close = (e: any) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  return (
    <div ref={dropDownRef} className="relative mx-auto w-fit text-black">
      <button onClick={() => setOpen((prev) => !prev)}>
        <Image
          width={40}
          height={40}
          className="size-10 rounded-full bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80"
          src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          alt="avatar drop down navigate ui"
        />
      </button>
      <ul
        className={`${
          open ? "visible duration-300" : "invisible"
        } absolute right-0 top-12 z-50 w-fit rounded-sm bg-slate-200 shadow-md`}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`rounded-sm px-6 py-2 ${
              open ? "opacity-100 duration-300" : "opacity-0"
            }  ${
              item === "Log Out"
                ? "text-red-500 hover:bg-red-600 hover:text-white"
                : "hover:bg-slate-300"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Avatar