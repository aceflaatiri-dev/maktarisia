// Automatically switch between development and production environments
export const BASE_URL = process.env.NODE_ENV === "development" 
  ? "http://localhost:5000" 
  : ""; // Empty string assumes the frontend and backend are on the same domain in production

export const USERS_URL = "/api/users";
export const CATEGORY_URL = "/api/category";
export const PRODUCT_URL = "/api/products";
export const UPLOAD_URL = "/api/upload";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";