import { indexApi } from "./index"

const extendedApi = indexApi.injectEndpoints({
    endpoints: (build) =>({
        getDepartments: build.query({
            query: () => ({
                url: "department",
                method: "GET"
            }),
            provideaTags: ["Department"]
        }),
        addDepartment: build.mutation({
            query: (data) => ({
                url: "department",
                method: "POST",
                body: data
            }),
            invalidatesTags:["Department"]
        }),
        updateDepartmentById: build.mutation({
            query: (data) => ({
                url: `department/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Department"]
        }),
        deleteDepartmentById: build.mutation({
            query: (id) =>({
                url: `department/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Department"]
        }),
    }),
    overrideExisting: false,
})

export const {useGetDepartmentsQuery, useAddDepartmentMutation, useDeleteDepartmentByIdMutation, useUpdateDepartmentByIdMutation } = extendedApi 