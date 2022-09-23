import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './CartItem.module.css';
import { updateToCartQuantity } from '../../redux/actions';
import ProductAmount from '../product-utils/productAmount/ProductAmount';
import ProductAttributes from '../product-utils/productAttributes/ProductAttributes';

import ProductCarousel from '../product-utils/productCarousel/ProductCarousel';

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  changeProductQuantity = (increase) => {
    const { productQuantity, productId, productSelectedAttributes } = this.props.item;

    const quantity = increase == true ? productQuantity + 1 : productQuantity - 1;

    this.props.updateToCartQuantity(
      productId,
      productSelectedAttributes,
      quantity,
    );
  };

  render() {
    const {
      productName,
      productBrand,
      productPrice,
      productAttributes,
      productSelectedAttributes,
      productQuantity,
      productGallery,
    } = this.props.item;

    return (
      <div className={style.cart}>
        <div className={style['cart-info-container']}>
          <div className={style['cart-info-name-brand']}>
            <p className={style['cart-info-name']}>{productName}</p>
            <p className={style['cart-info-brand']}>{productBrand}</p>
          </div>

          <div className={style['cart-info-price']}>
            <ProductAmount priceArray={productPrice} />
          </div>

          {this.props.item.productAttributes.length != 0 && (
            <div className="cart-item-attributes-container">
              <ProductAttributes
                lableFontSize={this.props.lableFontSize}
                optionWidth={this.props.optionWidth}
                attributes={productAttributes}
                productAttributes={productSelectedAttributes}
              />
            </div>
          )}
        </div>

        <div className={style.wrapper}>
          <div className={style['cart-quantity']}>
            <div
              onClick={() => this.changeProductQuantity(true)}
              className={style['cart-quantity-button']}
            >
              +
            </div>
            <div className="cart-item-quantity">{productQuantity}</div>
            <div
              onClick={() => this.changeProductQuantity(false)}
              className={style['cart-quantity-button']}
            >
              -
            </div>
          </div>
          <ProductCarousel images={productGallery} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  updateToCartQuantity,
})(CartItem);
