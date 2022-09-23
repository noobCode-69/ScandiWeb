import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductAttributes from '../product-utils/productAttributes/ProductAttributes';
import { addToCart } from '../../redux/actions';
import style from './MiniCart.module.css';

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      productAttributes: null,
      isMiniCartOpen: false,
    };
  }

  componentDidMount() {
    const attributeMap = {};
    for (let i = 0; i < this.props.productDetails.attributes.length; ++i) {
      const attr = this.props.productDetails.attributes[i];
      attributeMap[attr.id] = attr.items[0].id;
    }
    this.setState({
      ...this.state,
      productAttributes: attributeMap,
    });
  }

  changeProductAttributes = (attributeId, value) => {
    this.setState({
      ...this.state,
      productAttributes: {
        ...this.state.productAttributes,
        [attributeId]: value,
      },
    });
  };

  handleAddToCart = () => {
    if (this.props.productDetails.inStock == false) {
      return;
    }

    this.props.addToCart({
      productId: this.props.productDetails.productId,
      productBrand: this.props.productDetails.brand,
      productName: this.props.productDetails.name,
      productGallery: this.props.productDetails.gallery,
      productPrice: this.props.productDetails.prices,
      productAttributes: this.props.productDetails.attributes,
      productSelectedAttributes: this.state.productAttributes,
    });
  };

  render() {
    if (this.state.productAttributes == null) {
      return;
    }

    return (
      <>
        {this.props.isMouseOver == true && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              this.setState({ ...this.state, isMiniCartOpen: true });
              if (this.props.productDetails.attributes.length == 0) {
                this.handleAddToCart();
              }
            }}
            className={style['svg-container']}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_150_263)">
                <circle cx="37" cy="33" r="26" fill="#5ECE7B" />
                <path
                  d="M48.4736 26.8484C48.0186 26.2925 47.3109 25.9546 46.5785 25.9546H31.1907L30.711 24.1669C30.4326 23.1277 29.4732 22.4028 28.3608 22.4028H25.7837C25.3544 22.4028 25 22.7407 25 23.1523C25 23.5628 25.3534 23.9017 25.7837 23.9017H28.3608C28.7398 23.9017 29.0685 24.1433 29.1692 24.5058L32.2517 36.2494C32.53 37.2886 33.4894 38.0135 34.6018 38.0135H44.6833C45.7947 38.0135 46.7808 37.2886 47.0335 36.2494L48.9286 28.807C49.1053 28.1293 48.9543 27.4044 48.4736 26.8485L48.4736 26.8484ZM47.3879 28.4671L45.4928 35.9095C45.3921 36.272 45.0634 36.5136 44.6844 36.5136H34.6018C34.2228 36.5136 33.8941 36.272 33.7935 35.9095L31.5953 27.4772H46.5796C46.8323 27.4772 47.085 27.598 47.237 27.7915C47.388 27.984 47.463 28.2257 47.388 28.4673L47.3879 28.4671Z"
                  fill="white"
                />
                <path
                  d="M35.1332 38.9778C33.6932 38.9778 32.5059 40.1132 32.5059 41.4902C32.5059 42.8672 33.6933 44.0027 35.1332 44.0027C36.5733 44.0036 37.7606 42.8682 37.7606 41.491C37.7606 40.1137 36.5732 38.9775 35.1332 38.9775V38.9778ZM35.1332 42.4814C34.5519 42.4814 34.0968 42.0463 34.0968 41.4903C34.0968 40.9344 34.5519 40.4993 35.1332 40.4993C35.7146 40.4993 36.1696 40.9344 36.1696 41.4903C36.1687 42.0227 35.689 42.4814 35.1332 42.4814Z"
                  fill="white"
                />
                <path
                  d="M43.8251 38.978C42.3851 38.978 41.1978 40.1135 41.1978 41.4905C41.1978 42.8675 42.3852 44.0029 43.8251 44.0029C45.2651 44.0029 46.4525 42.8675 46.4525 41.4905C46.4279 40.1143 45.2651 38.978 43.8251 38.978ZM43.8251 42.4816C43.2438 42.4816 42.7887 42.0465 42.7887 41.4906C42.7887 40.9346 43.2438 40.4995 43.8251 40.4995C44.4065 40.4995 44.8615 40.9346 44.8615 41.4906C44.8615 42.0229 44.3809 42.4816 43.8251 42.4816Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_150_263"
                  x="0"
                  y="0"
                  width="74"
                  height="74"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="5.5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.113725 0 0 0 0 0.121569 0 0 0 0 0.133333 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_150_263"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_150_263"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        )}

        {this.props.productDetails.attributes.length != 0
          && this.state.isMiniCartOpen == true && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={style['mini-cart-dropdown']}
            >
              <div className={style['mini-cart-container']}>
                <ProductAttributes
                  productAttributes={this.state.productAttributes}
                  changeProductAttributes={this.changeProductAttributes}
                  attributes={this.props.productDetails.attributes}
                  lableFontSize="1rem"
                  optionWidth="3rem"
                />
                <div
                  className={style['add-to-cart']}
                  onClick={this.handleAddToCart}
                >
                  ADD TO CART
                </div>
              </div>
            </div>
        )}
        {this.props.productDetails.attributes.length != 0
          && this.state.isMiniCartOpen == true && (
            <div
              className={style['mini-cart-backdrop']}
              onClick={(e) => {
                e.stopPropagation();
                this.setState({
                  ...this.setState,
                  isMiniCartOpen: false,
                });

                this.props.toggleIsMouseOver();
              }}
            />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addToCart })(MiniCart);
