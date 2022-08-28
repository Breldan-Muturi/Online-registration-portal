import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const paymentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
});

const initialState = paymentsAdapter.getInitialState();

export const paymentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => "/api/payments/",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedPayments = responseData.map((mappedPayment) => {
          mappedPayment.id = mappedPayment._id;
          return mappedPayment;
        });
        return paymentsAdapter.setAll(initialState, loadedPayments);
      },
      providesTags: (result, error, args) => {
        if (result?.ids) {
          return [
            { type: "Payment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Payment", id })),
          ];
        } else {
          return [{ type: "Payment", id: "LIST" }];
        }
      },
    }),

    getPaymentsByApplication: builder.query({
      query: (applicationId) => `/api/payments/application/${applicationId}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
    }),

    createPayment: builder.mutation({
      query: (payment) => ({
        url: "/api/payments/",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: [{ type: "Payment", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentsByApplicationQuery,
  useCreatePaymentMutation,
} = paymentsApiSlice;

export const selectPaymentsResult =
  paymentsApiSlice.endpoints.getPayments.select();

const selectPaymentsData = createSelector(
  selectPaymentsResult,
  (paymentsResult) => paymentsResult.data
);

export const {
  selectAll: selectAllPayments,
  selectById: selectPaymentById,
  selectIds: selectPaymentiIds,
} = paymentsAdapter.getSelectors(
  (state) => selectPaymentsData(state) ?? initialState
);

export const selectApplicationPayments = createSelector(
  [selectAllPayments, (state, applicationId) => applicationId],
  (payments, applicationId) =>
    payments.filter(
      (filteredPayment) => filteredPayment.applicationId === applicationId
    )
);
