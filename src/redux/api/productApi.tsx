import { TProduct } from "@/Types/Global";
import { tagTypes } from "../TagTypes";
import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    createProduct: build.mutation({
      query: (data: any) => ({
        url: "product",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.products],
    }),
    getProducts: build.query({
      query: () => ({
        url: "products",
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),
    deleteProduct: build.mutation({
      query: (id: string) => ({
          url: `delete-product/${id}`,
          method: "DELETE",
        }
      ),
      invalidatesTags: [tagTypes.products],
    }),
    upProduct: build.mutation({
      query: ({ id, data }: any) => ({
        url: `update-product/${id}`,
        method: "PATCH",
         data,
      }),
      invalidatesTags: [tagTypes.products],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpProductMutation,
} = productApi;
