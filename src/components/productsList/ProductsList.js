import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import withRouter from '../hoc/withRouter';
import { fetchProducts } from '../../utils/api';
import ProductCard from '../productCard/ProductCard';
import { StyledProductsPage } from './ProductsList.styled';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      products: null,
    };
  }

  async componentDidMount() {
    const data = await fetchProducts(this.props.params.categoryId);
    if (data.error != undefined) {
      this.props.navigate('/error');
      return;
    }
    this.setState({ ...this.state, products: data.data.category.products });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.params.categoryId != prevProps.params.categoryId) {
      const data = await fetchProducts(this.props.params.categoryId);
      this.setState({
        ...this.state,
        products: data.data.category.products,
      });
    }
  }

  render() {
    if (this.state.products == null) {
      return <h1>Loading </h1>;
    }

    console.log(this.state.products);
    return (
      <StyledProductsPage>
        <div className="product-list__info-container">
          <p>{this.props.params.categoryId.toUpperCase()}</p>
        </div>

        <StyledProductsListContainer>
          {this.state.products.map((productItem) => (
            <ProductCard

              url={`/${this.props.params.categoryId}/${productItem.id}`}
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

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(Products));
