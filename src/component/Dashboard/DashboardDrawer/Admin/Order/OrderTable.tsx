"use client";
import React from "react";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

const OrderTable = ({
  product,
  HandleToUp,
  HandleToDelete,
}: {
  product: any;
  HandleToUp?: any;
  HandleToDelete?: any;
}) => {
  return (
    <>
      {product?.productId?.map((item: any, index: number) => {
        return (
          <tr key={index} className="hover:bg-gray-50 border-b transition duration-300 text-black">
            <td className="py-4 px-6 border-b  font-semibold">
              {product?.userId?.name}
            </td>
            <td className="py-4 px-6 border-b  font-semibold">{item?.name}</td>
            <td className="py-4 px-6 border-b  font-semibold">
              {item?.category}
            </td>
            <td className="py-4 px-6 border-b  font-semibold">
              {product?.userInfo?.number}
            </td>
            <td className="py-4 px-6 border-b  font-medium">${item?.price}</td>

            <td className="py-4 px-6 border-b ">
              <button className=" flex gap-1 items-center bg-green-100 px-3 rounded-full">
                <GiConfirmed className=" " />
                Pending
              </button>
            </td>
            <td className="py-4 px-6 border-b ">
              <Link href={`/products/${item?._id}`}>
                <button className=" flex gap-1 items-center bg-red-100 px-3 rounded-full">
                  Details
                  <FaArrowAltCircleRight className=" " />
                </button>
              </Link>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default OrderTable;
