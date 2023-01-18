import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api_base_url } from '../api/urls';

// Define a service using a base URL and expected endpoints
export const prescriptionApi = createApi({
	reducerPath: 'prescriptionApi',
	baseQuery: fetchBaseQuery({ baseUrl: api_base_url }),
	endpoints: builder => ({
		getListData: builder.query({
			query: () => `list`,
		}),
		addPatient: builder.mutation({
			query: data => ({
				url: 'addPatient',
				body: data,
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListDataQuery, useAddPatientMutation } = prescriptionApi;
