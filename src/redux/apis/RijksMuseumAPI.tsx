import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const rijksKey = "Cw3IKDr2"

export const rijksMuseumApi = createApi({
	reducerPath: "rijksMuseumApi",
	baseQuery: fetchBaseQuery({baseUrl : `https://www.rijksmuseum.nl/api/en`}), 
	endpoints: (builder) => ({
		getRijksAPIByName: builder.query({
			query: (name)=> `/collection?key=${rijksKey}&q=${name}&imgonly=True&ps=100`	
		}),	
		getRijksAPIByType: builder.query({
			query: (type)=> `/collection?key=${rijksKey}&type=${type}&imgonly=True&ps=100`		
		}),	
		getRijksAPIByMaker: builder.query({
			query: (maker)=> `/collection?key=${rijksKey}&principalMaker=${maker}&imgonly=True&ps=100`		
		}),	
		getRijksAPIByDatePeriod: builder.query({
			query: (span)=> `/collection?key=${rijksKey}&dating.period=${span}&imgonly=True&ps=100`		
		}),	
		getRijksAPIByPlace: builder.query({
			query: (place)=> `/collection?key=${rijksKey}&place=${place}&imgonly=True&ps=100`		
		}),	
		getRijksAPIByMaterial: builder.query({
			query: (material)=> `/collection?key=${rijksKey}&material=${material}&imgonly=True&ps=100`		
		}),	
		getRijksAPIByTechnique: builder.query({
			query: (technique)=> `/collection?key=${rijksKey}&technique=${technique}&imgonly=True&ps=100`		
		}),	
		getRijksAPIByColor: builder.query({
			query: (color)=> `/collection?key=${rijksKey}&normalized32Colors.hex=${color}&imgonly=True&ps=100`		
		}),	
	}),
})

export const { useGetRijksAPIByNameQuery, useGetRijksAPIByTypeQuery, useGetRijksAPIByMakerQuery, useGetRijksAPIByDatePeriodQuery, useGetRijksAPIByColorQuery, useGetRijksAPIByMaterialQuery, useGetRijksAPIByPlaceQuery, useGetRijksAPIByTechniqueQuery} = rijksMuseumApi

// &format=json