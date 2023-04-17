import { indexApi } from "."

const extendedApi = indexApi.injectEndpoints({
    endpoints: (build) => ({
        getIdeas: build.query({
            query: () => ({
                url: "idea",
                method: "GET"
            }),
            providesTags: ["Idea"]
        }),
        addIdea: build.mutation({
            query: (data) => ({
                url: "idea",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Idea"]
        }),
        updateIdea: build.mutation({
            query: (data) => ({
                url: `idea/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Idea"]
        }),

    }),
    overrideExisting: false,
})

export const { useGetIdeasQuery, useAddIdeaMutation } = extendedApi