import { apiSlice } from "./apiSlice";

const USER_URL = "/api/users";

export const userApiSice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getListedProducts: builder.query({
      query: () => ({
        url: `${USER_URL}/get-products`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-order`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGetListedProductsQuery,
  useCreateOrderMutation
} = userApiSice;
