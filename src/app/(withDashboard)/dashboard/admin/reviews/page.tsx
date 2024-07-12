/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Loading from "@/app/loading";
import ReviewTable from "@/component/Dashboard/DashboardDrawer/Admin/ReviewTable/ReviewTable";
import UserTable from "@/component/Dashboard/DashboardDrawer/Admin/User/User";
import EmptyCart from "@/component/EmptyCart/EmptyCart";
import { useFetchAllReviewsQuery } from "@/redux/api/reviewApi";
import React from "react";

const page = () => {
  const { data, isLoading } = useFetchAllReviewsQuery(undefined);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full mx-auto ">
      {data?.data ? (
        <table className=" w-full mx-auto shadow-md border border-gray-100 my-6">
          <thead>
            <tr className="bg-slate-200 text-black border-b-2 shadow-xl rounded-t-md">
              <th className="py-4 px-6 text-lg text-left border-b">Image</th>
              <th className="py-4 px-6 text-lg text-left border-b">
                User-Name
              </th>
              <th className="py-4 px-6 text-lg text-left border-b">
                Product-Name
              </th>
              <th className="py-4 px-6 text-lg text-left border-b">
                Product-Image
              </th>
              <th className="py-4 px-6 text-lg text-left border-b">Email</th>
            </tr>
          </thead>
          <tbody className=" bg-slate-100">
            {data?.data?.map((review: any) => (
              <ReviewTable key={review?._id} review={review} />
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
