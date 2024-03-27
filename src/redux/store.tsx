import { configureStore } from "@reduxjs/toolkit"
import { rijksMuseumApi } from "./apis/RijksMuseumAPI"
import { harvardMuseum } from "./apis/HarvardMuseumApi"


export default configureStore({
	reducer: {
		[rijksMuseumApi.reducerPath]: rijksMuseumApi.reducer,
		[harvardMuseum.reducerPath]: harvardMuseum.reducer,
		
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			rijksMuseumApi.middleware,
			harvardMuseum.middleware,
		
		]),
	
})