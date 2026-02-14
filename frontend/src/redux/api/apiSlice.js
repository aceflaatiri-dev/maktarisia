import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// Define the base query with security credentials enabled
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // This is critical for Cross-Origin Resource Sharing (CORS) 
  // and ensuring your JWT cookie is sent with every request.
  prepareHeaders: (headers) => {
    // If you ever need to manually add headers (like a Bearer token),
    // this is the place to do it.
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  // Tags are used for "caching and invalidation"
  // When a mutation is performed, we invalidate the tag to trigger a refresh
  tagTypes: ["Product", "Order", "User", "Category", "Review"],
  
  // Endpoints are injected from separate files using .injectEndpoints()
  endpoints: (builder) => ({}),
});