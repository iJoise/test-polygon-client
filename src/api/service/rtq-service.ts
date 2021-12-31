import {API_URL} from "../api-config";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface RandomResponseType {
  first: number
  second: number
  third: number
}

export const randomApi = createApi({
  reducerPath: 'randomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder)  => ({
    getRandomNumber: builder.query<RandomResponseType, RandomResponseType>({
      query: (data) => ({
        url: 'random',
        params: {
          first: data.first,
          second: data.second,
          third: data.third,
        }
      }) ,
    })
  })
})

export const {useGetRandomNumberQuery, useLazyGetRandomNumberQuery} = randomApi
