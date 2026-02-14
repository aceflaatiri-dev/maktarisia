// Retrieve favorites from localStorage with error handling
export const getFavoritesFromLocalStorage = () => {
  try {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  } catch (error) {
    console.error("Error parsing favorites from localStorage", error);
    return [];
  }
};

// Add a product to localStorage
export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  
  // Check if item already exists to prevent redundant entries
  const exists = favorites.some((p) => p._id === product._id);
  
  if (!exists) {
    const updatedFavorites = [...favorites, product];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }
};

// Remove a product from localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const filteredFavorites = favorites.filter((p) => p._id !== productId);
  
  localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
};