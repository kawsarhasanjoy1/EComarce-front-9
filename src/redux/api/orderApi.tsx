import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (data) => (
        console.log(data),
        {
          url: "order",
          method: "POST",
          data,
        }
      ),
    }),

    fetchAllOrder: build.query({
      query: () => ({
        url: `orders`,
        method: "GET",
      }),
    }),
    fetchOrder: build.query({
      query: (email) => ({
        url: `orders-email/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrderQuery,
  useFetchAllOrderQuery,
} = orderApi;
