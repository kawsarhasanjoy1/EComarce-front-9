'use client'
import Loading from "@/app/loading";
import AdminTable from "@/component/Dashboard/DashboardDrawer/Admin/AdminTable/AdminTable";
import EmptyCart from "@/component/EmptyCart/EmptyCart";
import { useFetchAllAdminQuery } from "@/redux/api/userAPi";
import React from "react";

const Page = () => {
  const { data, isLoading } = useFetchAllAdminQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full mx-auto">
      {data?.data ? (
        <table className="w-full mx-auto shadow-md border border-gray-100 my-6">
          <thead>
            <tr className="bg-slate-200 text-black border-b-2 shadow-xl rounded-t-md">
              <th className="py-4 px-6 text-lg text-left border-b">Image</th>
              <th className="py-4 px-6 text-lg text-left border-b">Name</th>
              <th className="py-4 px-6 text-lg text-left border-b">Email</th>
              <th className="py-4 px-6 text-lg text-left border-b">Role</th>
            </tr>
          </thead>
          <tbody className="bg-slate-100">
            {data?.data?.map((user: any) => (
              <AdminTable key={user?._id} users={user} />
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Page;
