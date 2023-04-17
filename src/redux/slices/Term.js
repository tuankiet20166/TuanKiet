import { indexApi } from "."

const extendedApi = indexApi.injectEndpoints({
    endpoints: (build) => ({
        getTerm: build.query({
            query: () => ({
                url: "term",
                method: "GET"
            }),
            providesTags: ["Term"]
        }),
        updateTerm: build.mutation({
            query: (data) => ({ 
                url: `term`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Term"]
        }),

    }),
    overrideExisting: false,
})

export const { useGetTermQuery, useUpdateTermMutation } = extendedApi