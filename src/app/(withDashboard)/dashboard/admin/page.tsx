'use client'
import Loading from "@/app/loading";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  useFetchStatsQuery
} from "@/redux/api/orderApi";
import { FaSellsy, FaUsers } from "react-icons/fa";
import { GrMoney, GrProductHunt } from "react-icons/gr";
import { GoCodeReview } from "react-icons/go";
import React from "react";
import { TriangleBar } from "@/utils/getPath";

const Page = () => {
  const { data: Stats, isLoading } = useFetchStatsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF5733", "#C70039"];

  

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-2 gap-9">
        <div className="bg-gradient-to-r from-violet-500 to-violet-300 h-40 rounded-xl w-full p-5 ">
          <div className="flex justify-between">
            <p className="text-white font-bold text-xl">Revenue</p>
            <p className="text-white font-bold text-xl">
              <GrMoney />
            </p>
          </div>
          <div className="flex justify-center items-center h-full text-5xl font-bold text-white">
            <p>${Stats?.data?.totalPrice}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-300 h-40 rounded-xl w-full p-5 ">
          <div className="flex justify-between">
            <p className="text-white font-bold text-xl">Products</p>
            <p className="text-white font-bold text-xl">
              <GrProductHunt />
            </p>
          </div>
          <div className="flex justify-center items-center h-full text-5xl font-bold text-white">
            <p>${Stats?.data?.totalProduct}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-300 h-40 rounded-xl p-5 w-full">
          <div className="flex justify-between">
            <p className="text-white font-bold text-xl">Order</p>
            <p className="text-white font-bold text-xl">
              <FaSellsy />
            </p>
          </div>
          <div className="flex justify-center items-center h-full text-5xl font-bold text-white">
            <p>{Stats?.data?.totalOrder}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-40 rounded-xl p-5 w-full">
          <div className="flex justify-between">
            <p className="text-white font-bold text-xl">Users</p>
            <p className="text-white font-bold text-xl">
              <FaUsers />
            </p>
          </div>
          <div className="flex justify-center items-center h-full text-5xl font-bold text-white">
            <p>{Stats?.data?.totalUser}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-teal-500 to-teal-300 h-40 rounded-xl p-5 w-full">
          <div className="flex justify-between">
            <p className="text-white font-bold text-xl">Review</p>
            <p className="text-white font-bold text-xl">
              <GoCodeReview />
            </p>
          </div>
          <div className="flex justify-center items-center h-full text-5xl font-bold text-white">
            <p>{Stats?.data?.totalReview}</p>
          </div>
        </div>
      </div>
      <div className="my-20">
        <BarChart
          width={1000}
          height={500}
          data={Stats?.data?.orderDetails}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="totalPrice"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {Stats?.data?.orderDetails.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default Page;
