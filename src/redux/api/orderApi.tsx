import { tagTypes } from "../TagTypes";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (data) => ({
        url: "order",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.orders],
    }),

    fetchAllOrder: build.query({
      query: () => ({
        url: `orders`,
        method: "GET",
      }),
      providesTags: [tagTypes.orders],
    }),
    fetchOrder: build.query({
      query: (email) => ({
        url: `orders-email/${email}`,
        method: "GET",
      }),
    }),
    fetchStatsWithEmail: build.query({
      query: (email) => ({
        url: `user-stats/${email}`,
        method: "GET",
      }),
      providesTags: [tagTypes.orders],
    }),
    fetchStats: build.query({
      query: (email) => ({
        url: `admin-stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.orders],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrderQuery,
  useFetchAllOrderQuery,
  useFetchStatsWithEmailQuery,
  useFetchStatsQuery,
} = orderApi;
