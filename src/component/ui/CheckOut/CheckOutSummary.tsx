"use client";
import Payment from "@/component/Stripe/Payment";
import { useAppSelector } from "@/redux/hook";

const CheckOutSummary = ({ stripe }: { stripe: string }) => {
  const { priceOfTotalSelectedProducts, selectedProducts } = useAppSelector(
    (store: any) => store.order
  );

  return (
    <div className=" space-y-4">
      <p className=" font-semibold text-xl">Checkout Summary</p>
      <div className="">
        <p className=" border-t-2 py-2 border-dotted flex justify-between">
          <span>Total order</span> <span>{selectedProducts}</span>
        </p>
        <p className=" border-t-2 py-2 border-dotted flex justify-between">
          <span> Sub total </span>
          <span>${priceOfTotalSelectedProducts}</span>
        </p>
        <p className=" border-t-2 py-2 border-dotted flex justify-between">
          <span> Shipping</span> <span>{15 * selectedProducts}</span>
        </p>
        <p className=" border-t-2 py-2 border-dotted flex justify-between border-b-2">
          <span>Total</span>{" "}
          <span>${15 * selectedProducts + priceOfTotalSelectedProducts}</span>
        </p>
      </div>
      <p className=" text-xl font-semibold">Shipping address</p>
      <div>
        <Payment stripe_pk={stripe} />
      </div>
    </div>
  );
};

export default CheckOutSummary;
