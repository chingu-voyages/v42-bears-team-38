import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const prescriptionApi = createApi({
	reducerPath: 'prescriptionApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000/' }),
	endpoints: builder => ({
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
export const { useAddPatientMutation } = prescriptionApi;
