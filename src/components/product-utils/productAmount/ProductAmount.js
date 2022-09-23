import React, { Component } from "react";
import { connect } from "react-redux";

class ProductAmount extends Component {
  constructor(props) {
    super(props);
  }

  getPrice = (pricesArray) => {
    const { selectedCurrency } = this.props;

    const priceObj = pricesArray.find((price) => {
      if (price.currency.label === selectedCurrency.label) {
        return true;
      }
      return false;
    });
    return priceObj;
  };

  render() {
    const { selectedCurrency, priceArray } = this.props;

    if (selectedCurrency == null || selectedCurrency == undefined) {
      return null;
    }

    return (
      <p>
        {this.getPrice(priceArray).currency.symbol}{" "}
        {this.getPrice(priceArray).amount.toFixed(2)}
      </p>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(ProductAmount);
