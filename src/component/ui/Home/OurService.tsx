import React from "react";
import Service from "../Service/Service";
import { FcServices } from "react-icons/fc";
import { MdEmojiEvents } from "react-icons/md";
import { TbDeviceMobileStar } from "react-icons/tb";
import Image from "next/image";

const OurService = () => {
  return (
    <div className=" pb-20">
      <p className=" text-center text-3xl font-semibold pb-14">Our Service</p>
      <div className=" relative md:space-y-0 space-y-16">
        <div className=" w-full h-full ">
          <Image
            className=" w-full h-[500px] rounded-xl"
            width={1024}
            height={1024}
            quality={100}
            priority
            layout="responsive"
            src={"https://i.ibb.co.com/Wp6QVcg/work-8049516-960-720.webp"}
            alt="services image"
          />
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:absolute top-[90%] md:mx-24">
          <Service
            title={"Home Delivery"}
            description={
              " Enjoy fresh, nutritious baby meals delivered to your doorstep with our convenient home delivery service. Choose from tailored meal plans with flexible subscription options"
            }
            Icon={FcServices}
          />
          <Service
            title={"Event Catering"}
            description={
              " Our event catering service offers healthy, baby-friendly options for baby showers, birthdays, and more. Make your celebrations special with our nutritious and delicious catering."
            }
            Icon={MdEmojiEvents}
          />
          <Service
            title={"Mobile App"}
            description={
              "Our mobile app helps you plan meals, track your baby’s nutrition, and access recipes on the go. Get feeding reminders and expert tips for a healthier baby"
            }
            Icon={TbDeviceMobileStar}
          />
        </div>
      </div>
    </div>
  );
};

export default OurService;
