import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { emptyCartItems as emptyCartItemsAction } from "../../redux/actions";
import CartItem from "../cartItem/CartItem";

import CartTotal from "../cartTotal/CartTotal";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cartItems, emptyCartItemsAction: emptyCartItems } = this.props;

    if (cartItems === null || cartItems === undefined) {
      return null;
    }

    return (
      <StyledCartItemContainer>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
          {cartItems.length <= 0 ? "NO ITEM IN THE CART" : "CART"}
        </h2>

        {cartItems.length > 0 &&
          cartItems.map((cartItem) => (
            <CartItem
              lableFontSize="1.1rem"
              optionWidth="3rem"
              key={JSON.stringify(cartItem.productSelectedAttributes)}
              item={cartItem}
            />
          ))}

        {cartItems.length > 0 && (
          <div className="cart-info">
            <CartTotal />
            <button
              type="submit"
              onClick={() => {
                emptyCartItems();
              }}
            >
              ORDER
            </button>
          </div>
        )}
      </StyledCartItemContainer>
    );
  }
}

const StyledCartItemContainer = styled.div`

  & .cart-info button {
    font-size: 1rem;
    font-weight: bold;
    outline: none;
    border: none;
    margin-top: 1rem;
    color: white;
    background-color: ${({ theme }) => theme.links.colors.hover};
    padding: 0.5rem 2rem;
  }

  & .cart-info button:hover {
    cursor: pointer;
  }
`;

const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});

export default connect(mapStateToProps, { emptyCartItemsAction })(Cart);
