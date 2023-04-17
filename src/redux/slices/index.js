import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const indexApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://web-enterprise-group-nextjs.vercel.app/api/' }),
  endpoints: () => ({}),
})