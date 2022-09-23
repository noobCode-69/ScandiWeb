import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

class CartTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
    };
  }

  componentDidMount() {
    this.getTotalAmount();
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.getTotalAmount();
    }
  }

  getTotalItems = () => {
    const { cartItems } = this.props;

    const quantity = cartItems.reduce(
      (accumulator, item) => accumulator + item.productQuantity,
      0
    );
    return quantity;
  };

  getProductPrice = (pricesArray) => {
    const { selectedCurrency } = this.props;

    const priceObj = pricesArray.find((price) => {
      if (price.currency.label === selectedCurrency.label) {
        return true;
      }
      return false;
    });
    return priceObj;
  };

  getTotalAmount = () => {
    const { selectedCurrency, cartItems } = this.props;

    if (selectedCurrency == null) {
      return;
    }

    let price = 0;
    for (let i = 0; i < cartItems.length; ++i) {
      price +=
        this.getProductPrice(cartItems[i].productPrice).amount *
        cartItems[i].productQuantity;
    }
    this.setState((prevState) => {
      return { ...prevState, total: price };
    });
  };

  render() {
    const { selectedCurrency } = this.props;
    const { total } = this.state;
    if (
      selectedCurrency == undefined ||
      selectedCurrency == null ||
      total == null
    ) {
      return null;
    }

    return (
      <StyleProductTotalContainer>
        <p>
          Tax 21% : {selectedCurrency.symbol}
          {"   "}
          {(0.21 * total).toFixed(2)}
        </p>
        <p>Quantity :{this.getTotalItems()}</p>
        <p>
          Total : {selectedCurrency.symbol} {total.toFixed(2)}
        </p>
      </StyleProductTotalContainer>
    );
  }
}

const StyleProductTotalContainer = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
  justify-content: center;
  font-weight: 500;
`;

const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(CartTotal);
