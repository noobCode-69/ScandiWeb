import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductAmount extends Component {
  constructor(props) {
    super(props);
  }

  getPrice = (pricesArray) => {
    const priceObj = pricesArray.find((price) => {
      if (price.currency.label === this.props.selectedCurrency.label) {
        return true;
      }
      return false;
    });
    return priceObj;
  };

  render() {
    if (this.props.selectedCurrency == null || this.props.selectedCurrency == undefined) {
      return null;
    }

    return (
      <p>
        {this.getPrice(this.props.priceArray).currency.symbol}
        {' '}
        {this.getPrice(this.props.priceArray).amount.toFixed(2)}
      </p>
    );
  }
}

const mapStateToProps = (state) => ({ selectedCurrency: state.selectedCurrency });

export default connect(mapStateToProps)(ProductAmount);
