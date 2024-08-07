"use client";
import { TOrder } from "@/Types/Global";
import CheckOutCart from "@/component/ui/CheckOut/CheckOutCart";
import CheckOutSummary from "@/component/ui/CheckOut/CheckOutSummary";
import { clearToOrder } from "@/redux/api/features/orderSlice";
/* eslint-disable react-hooks/rules-of-hooks */
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import verifyToken from "@/utils/verifyToken/verifyToken";
import { MdCancel } from "react-icons/md";

const stripe =
  (process.env.STRIPE_PK as string) ||
  "pk_test_51NchT9FavTzaXkmBPXJrPMjrnIGHdsIrJ6uJd5sxFFiSnmavwtZj3WafWWzdj8LkZPBN4TCuxfcwj6u5rR84LfHG00kYmfsPGt";
const Page = () => {
  const data = useAppSelector((store: any) => store.order.order);
  const { token } = useAppSelector((store: any) => store.auth);

  let user: any = null;
  if (token) {
    try {
      user = verifyToken(token);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const filter = data?.filter((item: TOrder) => item?.email == user?.email);
  const dispatch = useAppDispatch();

  return (
    <>
      {data?.length ? (
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-[#FFFF] p-5 shadow-md">
            <div className="flex justify-between font-bold text-xl py-3 text-black">
              <p>Total Order {data?.length}</p>
              <button
                onClick={() => dispatch(clearToOrder({ order: [] }))}
                className="flex justify-center items-center gap-1 bg-red-600 hover:bg-red-700 duration-300 text-sm text-white rounded-md px-2 py-1"
              >
                <MdCancel />
                Clear Order
              </button>
            </div>
            <div className="space-y-4">
              {filter?.map((order: TOrder) => (
                <CheckOutCart key={order?.productId} order={order} />
              ))}
            </div>
          </div>
          <div className="p-10 bg-[#FFFFFF] shadow-xl text-black">
            <CheckOutSummary stripe={stripe} />
          </div>
        </div>
      ) : (
        <p className="h-screen flex justify-center items-center text-2xl">
          Cart is empty
        </p>
      )}
    </>
  );
};

export default Page;
