"use client";
import React from "react";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import "./checkout.css";
import { MdErrorOutline } from "react-icons/md";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import toast from "react-hot-toast";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { clearToOrder } from "@/redux/api/features/orderSlice";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ price }: { price: number }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const [confirm, , setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store?.auth);
  const { order, priceOfTotalSelectedProducts, selectedProducts } =
    useAppSelector((store) => store?.order);
  const [createPayment] = useCreatePaymentMutation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await createPayment(price).unwrap();
        setClientSecret(res?.clientSecret);
      } catch (error) {
        console.error("Error creating payment:", error);
      }
    };
    fetchData();
  }, [price, createPayment]);

  const handleSubmit = async (e: FieldValues) => {
    e.preventDefault();
    const form = e.target;
    const name = form?.name.value;
    const number = form?.number.value;
    const district = form?.district.value;
    const subdistrict = form?.subdistrict.value;
    const userInfo = {
      name,
      number,
      district,
      subdistrict,
    };

    if (
      !userInfo?.name ||
      !userInfo?.district ||
      !userInfo.number ||
      !userInfo.subdistrict
    ) {
      toast.error("Please write all field");
    } else {
      if (!stripe || !elements) {
        return;
      }
      const card = elements.getElement(CardElement);
      if (card == null) {
        return;
      }
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });
      if (error) {
        console.log('error', error)
        setError(error?.message || "");
      } else {
        paymentMethod;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(`${clientSecret}`, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.name || "anonymous",
              email: user?.email || "anonymous",
            },
          },
        });
      if (confirmError) {
        console.log('confirmError', confirmError)
        setError(confirmError?.message as string);
      } else {
        if (paymentIntent?.status === "succeeded") {
          setLoading(true);
          const payment = {
            paymentId: paymentIntent?.id,
            userId: user?.id,
            email: user?.email,
            price: Number(priceOfTotalSelectedProducts + selectedProducts * 15),
            quantity: Number(selectedProducts),
            productId: order?.map((product) => product?.productId),
            userInfo,
          };
          const res = await createOrder(payment).unwrap();
          if (res?.success) {
            toast.success(`Order & payment successful`);
            dispatch(clearToOrder([]));
            router.push("/");
            setLoading(false);
          }
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            className="peer w-full rounded-sm border border-[#1B8EF8] px-4 py-2 text-black focus:outline-none"
            name="name"
            type="text"
          />
          <input
            placeholder="Contract number"
            className="peer w-full rounded-sm border border-[#1B8EF8] px-4 py-2 text-black focus:outline-none"
            name="number"
            type="number"
          />
          <input
            placeholder="District"
            className="peer w-full rounded-sm border border-[#1B8EF8] px-4 py-2 text-black focus:outline-none"
            name="district"
            type="text"
          />
          <input
            placeholder="subDistrict"
            className="peer w-full rounded-sm border border-[#1B8EF8] px-4 py-2 text-black focus:outline-none"
            name="subdistrict"
            type="text"
          />
        </div>
      </div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      {error ? (
        <p className=" text-red-400 pb-3 flex gap-1 items-center ">
          <MdErrorOutline />
          {error}
        </p>
      ) : (
        ""
      )}
      <button
        className=" bg-teal-400 px-4 py-2 rounded-md hover:bg-transparent duration-500 border border-teal-400"
        type="submit"
        disabled={!stripe || !clientSecret || loading}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
