import { tagTypes } from "../TagTypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => (
        console.log(data),
        {
          url: "create-user",
          method: "POST",
          data,
        }
      ),
      invalidatesTags: [tagTypes.user],
    }),
    loginUser: build.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        data,
      }),
    }),
    upRole: build.mutation({
      query: ({ id, role }: { id: string; role: string }) => ({
        url: `update-role/${id}`,
        method: "PATCH",
        data: { role },
      }),
      invalidatesTags: [tagTypes.user],
    }),
    fetchAllUser: build.query({
      query: () => ({
        url: `users`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    fetchAllAdmin: build.query({
      query: () => ({
        url: `admins`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useFetchAllAdminQuery,
  useUpRoleMutation,
  useFetchAllUserQuery,
} = userApi;
