import {
  ParamsType,
  ResponseMediaOfSlides,
  ResponseSliders,
} from "../../../types/sliders";
import { baseApi } from "../baseApi";

export const slidersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSliders: builder.query<ResponseSliders, ParamsType>({
      query: (params) => ({
        url: `/slides-of-designer`,
        method: "GET",
        params,
      }),
      providesTags: ["Sliders"],
    }),

    getMediaOfSlides: builder.query<ResponseMediaOfSlides, string>({
      query: (slideId) => ({
        url: `/media-of-slide/${slideId}`,
        method: "GET",
      }),
      providesTags: ["MediaOfSlides"],
    }),

    attachMediaToSlide: builder.mutation<void, { body: FormData; id: string }>({
      query: ({ body, id }) => ({
        url: `/api/attach-media-to-slide/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["MediaOfSlides"],
    }),

    saveSlideDummy: builder.mutation<void, { body: FormData; id: string }>({
      query: ({ body, id }) => ({
        url: `/api/save-slide-dummy/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["MediaOfSlides"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSlidersQuery,
  useGetMediaOfSlidesQuery,
  useAttachMediaToSlideMutation,
  useSaveSlideDummyMutation,
} = slidersApi;
