import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const harvardKey = "8daf5fe2-eec5-4083-9733-4bf65afa6007"

export const harvardMuseum = createApi({
	reducerPath: "harvardMuseum",
	baseQuery: fetchBaseQuery({baseUrl : `https://api.harvardartmuseums.org`}), 
	endpoints: (builder) => ({
			getHarvardApiType: builder.query({			
			query: (type) => `/${type}?apikey=${harvardKey}`,
		}),	
	
	}),
})

export const {useGetHarvardApiTypeQuery } = harvardMuseum