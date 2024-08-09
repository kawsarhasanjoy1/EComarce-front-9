"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useAppSelector } from "@/redux/hook";

const Payment = ({ stripe_pk }: { stripe_pk: string }) => {
  console.log(stripe_pk)
  const { priceOfTotalSelectedProducts, order, selectedProducts } =
    useAppSelector((store) => store?.order);
  const price = priceOfTotalSelectedProducts + selectedProducts * 15;
  const stripePromise = loadStripe(`${stripe_pk}`);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={price}></CheckoutForm>
    </Elements>
  );
};

export default Payment;
