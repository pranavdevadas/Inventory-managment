import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/admin-login`,
        method: "POST",
        body: data,
      }),
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/admin-addproduct`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/admin-get-products`,
        method: "GET",
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/admin-get-orders`,
        method: "GET",
      }),
    }),
    listUnlist: builder.mutation({
      query: ({ id, isListed }) => ({
        url: `${ADMIN_URL}/${id}/listunlist-status`,
        method: "PATCH",
        body: { isListed },
      }),
    }),
    editProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${ADMIN_URL}/${id}/editproduct`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAddProductMutation,
  useGetProductsQuery,
  useListUnlistMutation,
  useEditProductMutation,
  useGetOrdersQuery
} = adminApiSlice;
