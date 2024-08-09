import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation({
      query: (price: number) => ({
        url: "create-payment-intent",
        method: "POST",
        data: { price }, 
      }),
    }),
    fetchPaymentWithEmail: build.query({
      query: (email: string) => ({
        url: `orders-email/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useFetchPaymentWithEmailQuery } = paymentApi;
