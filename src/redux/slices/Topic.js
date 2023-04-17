import { indexApi } from "."

const extendedApi = indexApi.injectEndpoints({
    endpoints: (build) => ({
        getTopics: build.query({
            query: () => ({
                url: "topic",
                method: "GET"
            }),
            providesTags: ["Topic"]
        }),
        addTopic: build.mutation({
            query: (data) => ({
                url: "topic",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Topic"]
        }),
        updateTopicById: build.mutation({
            query: (data) => ({
                url: `topic/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Topic"]
        }),
        deleteTopicById: build.mutation({
            query: (id) => ({
                url: `topic/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Topic"]
        }),
    }),
    overrideExisting: false,
})

export const { useGetTopicsQuery, useAddTopicMutation, useUpdateTopicByIdMutation, useDeleteTopicByIdMutation } = extendedApi