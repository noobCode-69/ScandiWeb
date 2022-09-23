import React, { Component } from 'react';
import styled from 'styled-components';
import ProductAttributeGeneral from '../ProductAttributeGeneral/ProductAttributeGeneral';
import ProductAttributeSwatch from '../productAttributeSwatch/ProductAttributeSwatch';

class ProductAttributes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledAttributesContainer>
        {this.props.attributes.map((attribute) => {
          if (attribute.type == 'swatch') {
            return (
              <ProductAttributeSwatch
                lableFontSize={this.props.lableFontSize}
                optionWidth={this.props.optionWidth}
                key={attribute.id}
                selectedValue={this.props.productAttributes[attribute.id]}
                attribute={attribute}
                changeProductAttributes={this.props.changeProductAttributes}
              />
            );
          }
          return (
            <ProductAttributeGeneral
              lableFontSize={this.props.lableFontSize}
              optionWidth={this.props.optionWidth}
              key={attribute.id}
              selectedValue={this.props.productAttributes[attribute.id]}
              attribute={attribute}
              changeProductAttributes={this.props.changeProductAttributes}
            />
          );
        })}
      </StyledAttributesContainer>
    );
  }
}

const StyledAttributesContainer = styled.div`
  & > * {
    margin-bottom: 1rem;
  }
`;

export default ProductAttributes;
