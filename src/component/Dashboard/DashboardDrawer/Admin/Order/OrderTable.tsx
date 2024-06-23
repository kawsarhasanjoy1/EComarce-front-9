"use client";
import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const HandleToOpen = () => {
    setOpen(!open);
  };

  const productsObject = product?.product?.reduce(
    (accumulator: any, item: any) => {
      // Use item.id as the key
      accumulator["product"] = item;
      return accumulator;
    },
    {}
  );
  
  const reduce = productsObject?.product;

  return (
    <>
      <tr className="hover:bg-gray-50 border-b transition duration-300 text-black">
        <td className="py-4 px-6 border-b  font-semibold">{product?.name}</td>
        <td className="py-4 px-6 border-b  font-semibold">{reduce?.name}</td>
        <td className="py-4 px-6 border-b  font-semibold">{reduce?.category}</td>
        <td className="py-4 px-6 border-b  font-semibold">{product?.number}</td>
        <td className="py-4 px-6 border-b  font-medium">${product?.price}</td>

        <td className="py-4 px-6 border-b ">
          <button className=" flex gap-1 items-center bg-green-100 px-3 rounded-full">
            <GiConfirmed className=" " />
            Pending
          </button>
        </td>
      </tr>
    </>
  );
};

export default OrderTable;
