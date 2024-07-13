import React from "react";
import { FcServices } from "react-icons/fc";

const Service = ({ Icon, description, title }: any) => {
  return (
    <div>
      <div className=" bg-slate-100 shadow-xl relative text-center p-6 clear-start md:h-[200px]">
        <p className=" text-xl font-bold">{title}</p>
        <p className=" text-sm text-gray-500 font-semibold pt-3">{description}</p>
        <p className=" absolute -top-8 left-[36%] bg-black px-8 py-4 rounded-md text-white text-xl">
          <Icon />
        </p>
      </div>
    </div>
  );
};

export default Service;
