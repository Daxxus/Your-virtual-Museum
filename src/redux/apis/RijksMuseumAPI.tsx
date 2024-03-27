import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const APIKEY = `Cw3IKDr2`

export const rijksMuseumApi = createApi({
	reducerPath: "rijksMuseumApi",
	baseQuery: fetchBaseQuery({baseUrl : `https://www.rijksmuseum.nl/api/en`}), 
	endpoints: (builder) => ({
		getRijksAPIByName: builder.query({
			query: (name)=> `/collection?key=${APIKEY}&involvedMaker=${name}`		
		}),	
	}),
})

export const { useGetRijksAPIByNameQuery} = rijksMuseumApi