"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useFetchAllReviewsQuery } from "@/redux/api/reviewApi";
import Image from "next/image";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const { data } = useFetchAllReviewsQuery(undefined);
  const array = data?.data;

  const prevSlider = useCallback(() => {
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? array?.length - 2 : currentSlider - 1
    );
  }, [array]);

  const nextSlider = useCallback(() => {
    setCurrentSlider((currentSlider) =>
      currentSlider === array?.length - 2 ? 0 : currentSlider + 1
    );
  }, [array]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [nextSlider]);

  const isSmallScreen =
    typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <div>
      <p className="text-3xl font-semibold text-center mt-10">Testimonials</p>
      <div className="max-w-full min-w-[350px] mx-auto h-[400px] flex flex-row items-center overflow-hidden gap-5 lg:gap-10 md:px-16 lg:px-24">
        <div className="relative overflow-hidden">
          <div className="absolute w-full h-full flex items-center justify-between z-50 px-5">
            <button
              onClick={prevSlider}
              className="flex justify-center items-center bg-green-200 p-2 rounded-full w-6 h-6 md:w-11 md:h-11 relative overflow-hidden"
            >
              <FcPrevious size={40} />
              <div className="absolute top-0 left-0 border-[2px] w-full h-full border-red-300 rounded-full border-dotted transition-all hover:animate-spin"></div>
            </button>
            <button
              onClick={nextSlider}
              className="flex justify-center items-center bg-green-200 p-2 rounded-full w-8 h-8 md:w-11 md:h-11 relative overflow-hidden"
            >
              <FcNext size={40} />
              <div className="absolute top-0 left-0 border-[2px] w-full h-full border-red-300 rounded-full border-dotted transition-all hover:animate-spin"></div>
            </button>
          </div>
          <div
            className="ease-linear duration-300 flex"
            style={{
              transform: `translateX(-${
                currentSlider * (isSmallScreen ? 100 : 100)
              }%)`,
            }}
          >
            {array?.map((review: any, idx: number) => (
              <div key={idx} className="p-4 min-w-full md:min-w-[100%] w-full">
                <div className="h-full p-8 rounded flex flex-col justify-center items-center space-y-3">
                  <a className="flex flex-col justify-center text-center items-center space-y-3">
                    <Image
                      height={20}
                      width={20}
                      alt="testimonial"
                      src={review?.userId?.image}
                      className="w-16 h-16 rounded-full flex-shrink-0 object-cover object-center justify-center items-center mx-auto"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900">
                        {review.userId?.name}
                      </span>
                      <span className="text-sm rounded-md font-bold text-black w-full">
                        <Rating
                          className=""
                          style={{ maxWidth: 130 }}
                          value={review?.rating}
                          readOnly
                        />
                      </span>
                    </span>
                  </a>
                  <p className="leading-relaxed mb-6 text-gray-500 md:w-[100ch] text-center">
                    {review?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
