export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // 1. Calculate the base items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // 2. Calculate shipping price 
  // (Free shipping on orders over $100, otherwise $10 flat fee)
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);

  // 3. Calculate tax price (15% Tax Rate)
  state.taxPrice = addDecimals(Number(0.15 * Number(state.itemsPrice)));

  // 4. Calculate final total price
  // We wrap everything in Number() to ensure we are adding values, not strings
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // 5. Persist state to localStorage for session continuity
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};