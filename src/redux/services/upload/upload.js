import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    singleFileUpload: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `/files/upload`,
          method: "POST",
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
          body: formData,
        };
      },
    }),
  }),
});

export const { useSingleFileUploadMutation } = uploadApi;