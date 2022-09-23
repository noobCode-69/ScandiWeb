import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import withRouter from "../hoc/withRouter";
import { fetchProducts } from "../../utils/api";
import ProductCard from "../productCard/ProductCard";
import { StyledProductsPage } from "./ProductsList.styled";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };
  }

  async componentDidMount() {
    const { navigate, params } = this.props;

    const data = await fetchProducts(params.categoryId);
    if (data.error != undefined) {
      navigate("/error");
      return;
    }

    const { category } = data.data;
    this.setState((prevState) => {
      return { ...prevState, products: category.products };
    });
  }

  async componentDidUpdate(prevProps) {
    const { params } = this.props;
    if (params.categoryId != prevProps.params.categoryId) {
      const data = await fetchProducts(params.categoryId);
      const { category } = data.data;
      this.setState((prevState) => {
        return {
          ...prevState,
          products: category.products,
        };
      });
    }
  }

  render() {
    const { products } = this.state;
    const { params } = this.props;

    if (products == null) {
      return <h1>Loading </h1>;
    }
    return (
      <StyledProductsPage>
        <div className="product-list__info-container">
          <p>{params.categoryId.toUpperCase()}</p>
        </div>

        <StyledProductsListContainer>
          {products.map((productItem) => (
            <ProductCard
              url={`/${params.categoryId}/${productItem.id}`}
              key={productItem.name}
              productDetails={productItem}
            />
          ))}
        </StyledProductsListContainer>
      </StyledProductsPage>
    );
  }
}

const StyledProductsListContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 4rem;

  @media (max-width: 675px) {
    & {
      justify-items: center;
    }
  }
`;

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(Products));
