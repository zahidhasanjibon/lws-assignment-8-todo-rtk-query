import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes:["todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({status,colors}) => {
            const colorsFilter = colors.map((c) => `color_like=${c}`).join("&")
            return `/todos/?completed_like=${status}&${colorsFilter}`
           },
      providesTags:["todos"],
    }),

    addTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["todos"]
    }),
    updateTodoTitle: builder.mutation({
        query: ({ id, data }) => ({
            url: `/todos/${id}`,
            method: "PATCH",
            body: data,
        }),
        invalidatesTags: ["todos"],
    }),
    updateTodoStatus: builder.mutation({
        query: ({ id, data }) => ({
            url: `/todos/${id}`,
            method: "PATCH",
            body: data,
        }),
        invalidatesTags: ["todos"],
    }),
    updateTodoColor: builder.mutation({
        query: ({ id, data }) => ({
            url: `/todos/${id}`,
            method: "PATCH",
            body: data,
        }),
        invalidatesTags: ["todos"],
    }),

    deleteTodo: builder.mutation({
        query: (id) => ({
            url: `/todos/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["todos"],
    }),






  }),
});
export const { useGetTodosQuery, useAddTodoMutation,useDeleteTodoMutation,useUpdateTodoTitleMutation ,useUpdateTodoStatusMutation,useUpdateTodoColorMutation} = apiSlice;
