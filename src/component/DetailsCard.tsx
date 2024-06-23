"use client";
import { TProduct } from "@/Types/Global";
import Image from "next/image";
import React, { useState } from "react";
import Button from "./ui/Button/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import toast from "react-hot-toast";
import { addToOrder } from "@/redux/api/features/orderSlice";
import { FieldValues } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { useFetchAllUserQuery } from "@/redux/api/userAPi";

const DetailsCard = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();
  const { data } = useFetchAllUserQuery(undefined);
  const user = useAppSelector((store) => store?.auth?.user);

  const userInfo = product?.reviews?.flatMap((item: any) => {
    // Filter the user based on the userId
    const userFilter: any = data?.data?.filter(
      (user: any) => user?._id === item?.userId
    );
    const reviewFilter = product?.reviews?.filter(
      (user: any) => user?.userId === item?.userId
    );

    return userFilter?.map((user: any) => {
      return {
        user,
        reviews: reviewFilter,
      };
    });
  });


  const [createReview] = useCreateReviewMutation();
  const [rating, setRating] = useState(0);

  const HandleToAdd = async (products: TProduct) => {
    const order = {
      email: user?.email,
      productId: products?._id,
      category: products?.category,
      name: products?.name,
      price: products?.price,
      image: products?.image,
    };

    try {
      dispatch(addToOrder({ order: order }));
    } catch (err: any) {
      toast?.error(
        err?.message || "An error occurred while adding to the order."
      );
    }
  };

  const handleToSubmit = async (values: FieldValues) => {
    values.preventDefault();
    const data = {
      rating: rating,
      description: values.target?.description?.value,
      userId: user?.id,
      productId: product?._id,
    };

    if (data?.rating == 0) {
      toast.error("Please select rating");
    } else {
      try {
        const res = await createReview(data).unwrap();
        if (res?.success) {
          toast.success("You submit rating");
        }
      } catch (err) {
        toast.error("Something went wrong , Please provide new UserId");
      }
    }
  };

  return (
    <div>
      <div className=" md:grid grid-cols-2 gap-10 md:px-0 px-3 my-10 font-bold">
        <div className=" relative">
          <Image
            className=" border md:h-screen object-cover"
            src={product.image}
            height={700}
            width={700}
            alt={product.name}
          />
          <div className=" absolute top-6 left-6">
            <div className=" relative text-3xl font-semibold text-green-600">
              {product?.discountPrice ? `$${product.price}` : ""}
              <p
                className={`${
                  product?.discountPrice
                    ? "border border-black w-20 absolute top-[50%]"
                    : ""
                } `}
              ></p>
            </div>
          </div>
        </div>
        <div className=" space-y-10">
          <div className=" space-y-4">
            <p className=" text-xl font-semibold">{product.name}</p>

            <p className=" text-3xl font-semibold text-green-600">
              $
              {product?.discountPrice ? product?.discountPrice : product?.price}
            </p>
            <p>{product.description}</p>
          </div>
          <hr />
          <div className=" space-y-2">
            <div className=" font-semibold">
              Type: <span className=" font-normal">{product.category}</span>
            </div>
            <div className=" font-semibold">
              Vitamins:{" "}
              <span className=" font-normal">{product.nutrients.vitamins}</span>
            </div>
            <div className=" font-semibold">
              Minerals:{" "}
              <span className=" font-normal">{product.nutrients.minerals}</span>
            </div>
          </div>
          <hr />
          <div className=" flex gap-6">
            <button
              className="border-2 border-[#93991d] w-40 h-16 bg-[#9dae11] relative after:absolute after:h-[100%] after:w-[100%] after:bg-white after:top-0 after:left-0 transform text-white after:-translate-x-[100%] after:duration-500 hover:after:translate-x-0 hover:text-black  overflow-hidden z-10 after:z-[-1] flex items-center justify-center gap-2"
              onClick={() => HandleToAdd(product)}
            >
              Add to Cart
            </button>
            <Button className="h-16 w-40">Buy it now</Button>
          </div>
          <hr />
          <div>
            <p className=" font-semibold ">Secure Payment Gateway</p>
            <div className=" flex gap-8 mt-6 ">
              <Image
                src={"https://i.ibb.co/wJ2phHC/Amazon-icon.png"}
                width={40}
                height={20}
                className=" border w-16 h-8 object-contain cursor-pointer"
                alt="emajhon"
              />
              <Image
                src={
                  "https://i.ibb.co/PxKWMP1/1656235199bkash-logo-transparent.webp"
                }
                width={40}
                height={20}
                className=" border w-16 h-8 object-contain cursor-pointer"
                alt="emajhon"
              />
              <Image
                src={"https://i.ibb.co/Hqcbrk3/visa-512.webp"}
                width={40}
                height={20}
                className=" border w-16 h-8 object-contain cursor-pointer"
                alt="emajhon"
              />
              <Image
                src={"https://i.ibb.co/Hqcbrk3/visa-512.webp"}
                width={40}
                height={20}
                className=" border w-16 h-8 object-contain cursor-pointer"
                alt="emajhon"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className=" grid md:grid-cols-2 grid-cols-1 my-10 space-y-10 md:space-y-0">
        <div className=" ">
          <form
            className="flex flex-col justify-center items-center space-y-2"
            onSubmit={handleToSubmit}
          >
            <p className=" text-3xl font-bold">Rating</p>
            <p>Rate this product </p>
            <Rating
              style={{ maxWidth: 180 }}
              value={rating}
              onChange={setRating}
            />
            <label className=" block font-semibold pb-2" htmlFor="name">
              Description *
            </label>
            <input
              type="text"
              name="description"
              className={`peer w-[70%] rounded-sm border border-[#1B8EF8] px-4 py-2 text-black focus:outline-none }`}
              placeholder=""
              required={true}
            />
            <button
              type="submit"
              className="border-2 border-[#93991d] w-40 h-16 bg-[#9dae11] relative after:absolute after:h-[100%] after:w-[100%] after:bg-white after:top-0 after:left-0 transform text-white after:-translate-x-[100%] after:duration-500 hover:after:translate-x-0 hover:text-black  overflow-hidden z-10 after:z-[-1] flex items-center justify-center gap-2 uppercase"
            >
              submit
            </button>
          </form>
        </div>

        <div className=" space-y-4 text-center">
          <p className="text-3xl font-semibold">Rating Details</p>
          <div className=" space-y-2">
            <p className=" text-2xl font-semibold">
              {" "}
              Rating Quantity: {product?.ratingQuantity}{" "}
            </p>
            <p className=" text-2xl">
              Average Rating : {product?.ratingAverage?.toFixed(1)}{" "}
            </p>
            <div className=" flex flex-col justify-center items-center">
              <Rating
                style={{ maxWidth: 180 }}
                value={Number(product?.ratingAverage)}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        {userInfo?.map((user: any) => {
          return (
            <div className=" space-y-4 my-10 border p-10 rounded-md border-dotted">
              <div className="flex gap-4 content-center items-center">
                <div>
                  <Image
                    className=" size-10 rounded-full"
                    src={
                      user?.user?.image
                        ? user?.user?.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzfHCCdZf-Tu-MsUOkruCAexj1pwkHXdaMVA&s"
                    }
                    alt="image"
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  <p>{user?.user?.name}</p>{" "}
                  {user?.reviews?.map((item: any) => {
                    return (
                      <Rating
                        style={{ maxWidth: 90 }}
                        value={Number(item?.rating)}
                        readOnly
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                {user?.reviews?.map((item: any) => {
                  return <p>{item?.description}</p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsCard;
