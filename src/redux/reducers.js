import { combineReducers } from "redux";

const updateCurrencyReducer = (
  selectedCurrency = JSON.parse(localStorage.getItem("selectedCurrency")) ||
    null,
  action
) => {
  if (action.type === "UPDATE_CURRENCY") {
    localStorage.setItem(
      "selectedCurrency",
      JSON.stringify({
        label: action.payload.label,
        symbol: action.payload.symbol,
      })
    );
    return action.payload;
  }
  return selectedCurrency;
};

const updateCartItemsReducer = (
  cartItems = localStorage.getItem("cartItems") === null
    ? []
    : JSON.parse(localStorage.getItem("cartItems")),
  action
) => {
  let newCartItems = JSON.parse(JSON.stringify(cartItems));

  if (action.type === "ADD_TO_CART") {
    const {
      productName,
      productId,
      productBrand,
      productGallery,
      productPrice,
      productSelectedAttributes,
      productAttributes,
    } = action.payload.productDetails;

    let isPresent = false;
    let productIndex = -1;

    newCartItems.forEach((newCartItem, index) => {
      if (
        newCartItem.productId === productId &&
        JSON.stringify(newCartItem.productSelectedAttributes) ===
          JSON.stringify(productSelectedAttributes)
      ) {
        isPresent = true;
        productIndex = index;
      }
    });

    if (isPresent) {
      newCartItems[productIndex].productQuantity += 1;
    } else {
      newCartItems.push({
        productId,
        productName,
        productBrand,
        productGallery,
        productPrice,
        productSelectedAttributes,
        productAttributes,
        productQuantity: 1,
      });
    }
  } else if (action.type === "UPDATE_CART_QUANTITY") {
    const { productId, productSelectedAttributes, quantity } = action.payload;

    newCartItems.forEach((newCartItem, index) => {
      if (
        newCartItem.productId === productId &&
        JSON.stringify(newCartItem.productSelectedAttributes) ===
          JSON.stringify(productSelectedAttributes)
      ) {
        if (quantity <= 0) {
          newCartItems.splice(index, 1);
        } else {
          newCartItem.productQuantity = quantity;
        }
      }
    });
  } else if (action.type === "EMPTY_CART_ITEMS") {
    newCartItems = [];
  }

  localStorage.setItem("cartItems", JSON.stringify(newCartItems));

  return newCartItems;
};

export default combineReducers({
  selectedCurrency: updateCurrencyReducer,
  cartItems: updateCartItemsReducer,
});
