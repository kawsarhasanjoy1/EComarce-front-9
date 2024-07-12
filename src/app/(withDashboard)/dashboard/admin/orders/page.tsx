/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Loading from "@/app/loading";
import OrderTable from "@/component/Dashboard/DashboardDrawer/Admin/Order/OrderTable";
import EmptyCart from "@/component/EmptyCart/EmptyCart";
import { useFetchAllOrderQuery } from "@/redux/api/orderApi";
import React from "react";

const page = () => {
  const { data, isLoading } = useFetchAllOrderQuery(undefined);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full mx-auto ">
      {data?.data ? (
        <table className=" w-full mx-auto shadow-md border border-gray-100 my-6">
          <thead>
            <tr className="bg-slate-200 text-black border-b-2 shadow-xl rounded-t-md">
              <th className="py-4 px-6 text-lg text-left border-b">Name</th>
              <th className="py-4 px-6 text-lg text-left border-b">
                Product Name
              </th>
              <th className="py-4 px-6 text-lg text-left border-b">Category</th>
              <th className="py-4 px-6 text-lg text-left border-b">Number</th>
              <th className="py-4 px-6 text-lg text-left border-b">Price</th>
              <th className="py-4 px-6 text-lg text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody className=" bg-slate-100">
            {data?.data?.map((product: any) => (
              <OrderTable key={product?._id} product={product} />
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default page;
