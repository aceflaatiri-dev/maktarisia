import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "../redux/features/favorites/favoriteSlice";
import cartSliceReducer from "../redux/features/cart/cartSlice";
import shopReducer from "../redux/features/shop/shopSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    // RTK Query Cache
    [apiSlice.reducerPath]: apiSlice.reducer,
    
    // Global State Slices
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
    shop: shopReducer,
  },

  // Hydrating favorites from local storage on load
  preloadedState: {
    favorites: initialFavorites,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Often useful when handling complex data or dates
    }).concat(apiSlice.middleware),
    
  devTools: true,
});

// Required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export default store;