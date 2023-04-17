import { indexApi } from "."

const extendedApi = indexApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => ({
                url: "category",
                method: "GET"
            }),
            providesTags: ["Category"]
        }),
        addCategory: build.mutation({
            query: (data) => ({
                url: "category",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Category"]
        }),
        updateCategoryById: build.mutation({
            query: (data) => ({
                url: `category/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Category"]
        }),
        deleteCategoryById: build.mutation({
            query: (id) => ({
                url: `category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"]
        }),
    }),
    overrideExisting: false,
})

export const { useGetCategoriesQuery, useAddCategoryMutation, useUpdateCategoryByIdMutation, useDeleteCategoryByIdMutation } = extendedApi