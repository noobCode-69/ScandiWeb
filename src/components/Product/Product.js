import React, { Component } from "react";
import parse from "html-react-parser";
import { connect } from "react-redux";
import style from "./Product.module.css";
import { addToCart as addToCartAction } from "../../redux/actions";

import withRouter from "../hoc/withRouter";

import { fetchProductDetails } from "../../utils/api";
import ProductAmount from "../product-utils/productAmount/ProductAmount";
import ProductGallery from "../product-utils/productGallery/ProductGallery";
import ProductAttributes from "../product-utils/productAttributes/ProductAttributes";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productDetails: null,
      productAttributes: null,
    };
  }

  async componentDidMount() {
    const { params } = this.props;
    const { navigate } = this.props;
    const data = await fetchProductDetails(params.productId);
    if (data.error !== undefined) {
      navigate("/error");
      return;
    }

    const { attributes } = data.data.product;

    const attributeMap = {};
    for (let i = 0; i < attributes.length; ) {
      const attr = attributes[i];
      attributeMap[attr.id] = attr.items[0].id;
      i += 1;
    }
    this.setState((prevState) => ({
      ...prevState,
      productDetails: data.data.product,
      productAttributes: attributeMap,
    }));
  }

  changeProductAttributes = (attributeId, value) => {
    this.setState((prevState) => ({
      ...prevState,
      productAttributes: {
        ...prevState.productAttributes,
        [attributeId]: value,
      },
    }));
  };

  handleAddToCart = () => {
    const { productDetails, productAttributes } = this.state;
    const { params, addToCartAction: addToCart } = this.props;
    if (productDetails.inStock === false) {
      return;
    }

    addToCart({
      productId: params.productId,
      productBrand: productDetails.brand,
      productName: productDetails.name,
      productGallery: productDetails.gallery,
      productPrice: productDetails.prices,
      productAttributes: productDetails.attributes,
      productSelectedAttributes: productAttributes,
    });
  };

  render() {
    const { productDetails, productAttributes } = this.state;

    if (productDetails == null) {
      return <h1>Loading.</h1>;
    }

    return (
      <div className={style["product-page-container"]}>
        <ProductGallery images={productDetails.gallery} />

        <div className={style["product-info-container"]}>
          <div className={style["product-name-brand"]}>
            <p style={{ fontWeight: "bold" }}>{productDetails.name}</p>
            <p>{productDetails.brand} </p>
          </div>

          {productDetails.attributes.length >= 1 && (
            <div className="product-attribute-container">
              <ProductAttributes
                productAttributes={productAttributes}
                changeProductAttributes={this.changeProductAttributes}
                attributes={productDetails.attributes}
                lableFontSize="1rem"
                optionWidth="3rem"
              />
            </div>
          )}

          <div className={style["product-price"]}>
            <p>PRICE </p>
            <ProductAmount priceArray={productDetails.prices} />
          </div>

          <button
            type="submit"
            onClick={this.handleAddToCart}
            className={style["product-add-to-cart"]}
          >
            ADD TO CART
          </button>

          <div className={style["product-description"]}>
            {parse(productDetails.description)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
export default withRouter(
  connect(mapStateToProps, { addToCartAction })(Product)
);
