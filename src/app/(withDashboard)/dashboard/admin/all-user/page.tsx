/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Loading from "@/app/loading";
import UserTable from "@/component/Dashboard/DashboardDrawer/Admin/User/User";
import EmptyCart from "@/component/EmptyCart/EmptyCart";
import { useFetchAllUserQuery, useUpRoleMutation } from "@/redux/api/userAPi";
import React from "react";
import toast from "react-hot-toast";

const page = () => {
  const [upRole] = useUpRoleMutation();
  const HandleToAdmin = async (id: string) => {
    try {
      const res: any = await upRole({ id, role: "admin" });
      if (res?.data?.success) {
        toast.success("Admin successful");
      }
    } catch (err) {
      toast.error("Admin field");
    }
  };
  const HandleToCancel = async (id: string) => {
    try {
      const res: any = await upRole({ id, role: "user" });
      if (res?.data?.success) {
        toast.success("Admin cancel successful");
      }
    } catch (err) {
      toast.error("Admin cancel field");
    }
  };
  const { data, isLoading } = useFetchAllUserQuery(undefined);
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
              <th className="py-4 px-6 text-lg text-left border-b">Name</th>
              <th className="py-4 px-6 text-lg text-left border-b">Email</th>
              <th className="py-4 px-6 text-lg text-left border-b">Role</th>
              <th className="py-4 px-6 text-lg text-left border-b">Action</th>
            </tr>
          </thead>
          <tbody className=" bg-slate-100">
            {data?.data?.map((user: any) => (
              <UserTable
                HandleToAdmin={HandleToAdmin}
                HandleToCancel={HandleToCancel}
                key={user?._id}
                users={user}
              />
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
