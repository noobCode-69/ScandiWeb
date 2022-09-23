import React, { Component } from 'react';

import { StyledProductCard } from './ProductCard.styled';

import withRouter from '../hoc/withRouter';

import ProductAmount from '../product-utils/productAmount/ProductAmount';
import MiniCart from '../minicart/MiniCart';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      isMouseOver: false,
    };
  }

  toggleIsMouseOver = () => {
    this.setState({
      ...this.setState,
      isMouseOver: !this.state.isMouseOver,
    });
  };

  render() {
    return (
      <StyledProductCard
        onClick={() => {
          this.props.navigate(this.props.url);
        }}
        onMouseOver={() => {
          this.setState({ ...this.state, isMouseOver: true });
        }}
        onMouseLeave={() => {
          this.setState({ ...this.state, isMouseOver: false });
        }}
      >
        {this.props.productDetails.inStock == false && (
          <div className="front-backdrop">
            <p>OUT OF STOCK</p>
          </div>
        )}

        <div className="img-container">
          <img src={this.props.productDetails.gallery[0]} />
        </div>

        <MiniCart
          toggleIsMouseOver={this.toggleIsMouseOver}
          isMouseOver={this.state.isMouseOver}
          productDetails={this.props.productDetails}
        />

        <div className="info-container">
          <div className="info-container__product-title">
            <p className="info-container__product-brand">
              {this.props.productDetails.brand}
            </p>
            <p className="info-container__product-name">
              {this.props.productDetails.name}
            </p>
          </div>
          <ProductAmount priceArray={this.props.productDetails.prices} />
        </div>
      </StyledProductCard>
    );
  }
}

export default withRouter(ProductCard);
