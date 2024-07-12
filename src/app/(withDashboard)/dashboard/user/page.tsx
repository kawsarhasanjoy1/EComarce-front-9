"use client";
import React from "react";
import { FaSellsy } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { GoCodeReview } from "react-icons/go";
import { useAppSelector } from "@/redux/hook";
import { useFetchStatsWithEmailQuery } from "@/redux/api/orderApi";
import Loading from "@/app/loading";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { TriangleBar } from "@/utils/getPath";

const Page = () => {
  const { user } = useAppSelector((store) => store?.auth);
  const { data: Stats, isLoading } = useFetchStatsWithEmailQuery(user?.email);
  if (isLoading) {
    return <Loading />;
  }
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  const data = [
    {
      name: "Supliment",
      price: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Fruit",
      price: 2500,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Juice",
      price: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Milk",
      price: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Vegetables",
      price: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Proteins",
      price: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Fruit Pouches",
      price: 3490,
      pv: 4300,
      amt: 2100,
    },
   
  ];



  return (
    <div className=" py-10">
    
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 gap-9">
        <div className=" bg-gradient-to-r from-violet-500 to-violet-300 h-40 rounded-xl w-full p-5 ">
          <div className=" flex justify-between">
            <p className=" text-white font-bold text-xl">Revenue</p>
            <p className=" text-white font-bold text-xl">
              <GrMoney />
            </p>
          </div>
          <div className=" flex justify-center items-center h-full text-5xl font-bold text-white">
            <p>${Stats?.data?.totalPrice}</p>
          </div>
        </div>
        <div className=" bg-gradient-to-r from-red-500 to-red-300 h-40 rounded-xl p-5 w-full">
          <div className=" flex justify-between">
            <p className=" text-white font-bold text-xl">Order</p>
            <p className=" text-white font-bold text-xl">
              <FaSellsy />
            </p>
          </div>
          <div className=" flex justify-center items-center h-full text-5xl font-bold text-white">
            <p>{Stats?.data?.totalOrder}</p>
          </div>
        </div>
        <div className=" bg-gradient-to-r from-teal-500 to-teal-300 h-40 rounded-xl p-5 w-full">
          <div className=" flex justify-between">
            <p className=" text-white font-bold text-xl">Review</p>
            <p className=" text-white font-bold text-xl">
              <GoCodeReview />
            </p>
          </div>
          <div className=" flex justify-center items-center h-full text-5xl font-bold text-white">
            <p>{Stats?.data?.totalReview}</p>
          </div>
        </div>
      </div>
      <div className=" my-20">
        <BarChart
          width={1000}
          height={500}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="price"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default Page;
