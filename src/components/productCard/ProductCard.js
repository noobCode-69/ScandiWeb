import React, { Component } from "react";
import { StyledProductCard } from "./ProductCard.styled";
import withRouter from "../hoc/withRouter";
import ProductAmount from "../product-utils/productAmount/ProductAmount";
import MiniCart from "../minicart/MiniCart";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false,
    };
  }

  toggleIsMouseOver = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isMouseOver: !prevState.isMouseOver,
      };
    });
  };

  render() {
    const { url, productDetails, navigate } = this.props;
    const { isMouseOver } = this.state;

    return (
      <StyledProductCard
        onClick={() => {
          navigate(url);
        }}
        onMouseOver={() => {
          this.setState((prevState) => {
            return { ...prevState, isMouseOver: true };
          });
        }}
        onMouseLeave={() => {
          this.setState((prevState) => {
            return { ...prevState, isMouseOver: false };
          });
        }}
      >
        {productDetails.inStock === false && (
          <div className="front-backdrop">
            <p>OUT OF STOCK</p>
          </div>
        )}

        <div className="img-container">
          <img src={productDetails.gallery[0]} />
        </div>

        <MiniCart
          toggleIsMouseOver={this.toggleIsMouseOver}
          isMouseOver={isMouseOver}
          productDetails={productDetails}
        />

        <div className="info-container">
          <div className="info-container__product-title">
            <p className="info-container__product-brand">
              {productDetails.brand}
            </p>
            <p className="info-container__product-name">
              {productDetails.name}
            </p>
          </div>
          <ProductAmount priceArray={productDetails.prices} />
        </div>
      </StyledProductCard>
    );
  }
}

export default withRouter(ProductCard);
