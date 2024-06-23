import { tagTypes } from "../TagTypes";
import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => ({
        url: "review",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    fetchAllReviews: build.query({
      query: () => ({
        url: "reviews",
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    fetchSingleReviewWithUserId: build.query({
      query: (id: string) => ({
        url: `user-review/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useFetchAllReviewsQuery,
  useFetchSingleReviewWithUserIdQuery,
} = reviewApi;
