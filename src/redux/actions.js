export const updateCurrency = (currency) => ({
  type: 'UPDATE_CURRENCY',
  payload: currency,
});

export const addToCart = (productDetails) => ({
  type: 'ADD_TO_CART',
  payload: {
    productDetails,
  },
});

export const updateToCartQuantity = (
  productId,
  productSelectedAttributes,
  quantity,
) => ({
  type: 'UPDATE_CART_QUANTITY',
  payload: {
    productId,
    productSelectedAttributes,
    quantity,
  },
});

export const emptyCartItems = () => ({
  type: 'EMPTY_CART_ITEMS',
});
