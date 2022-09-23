import React, { Component } from "react";
import styled from "styled-components";
import ProductAttributeGeneral from "../ProductAttributeGeneral/ProductAttributeGeneral";
import ProductAttributeSwatch from "../productAttributeSwatch/ProductAttributeSwatch";

class ProductAttributes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      attributes,
      lableFontSize,
      optionWidth,
      productAttributes,
      changeProductAttributes,
    } = this.props;

    return (
      <StyledAttributesContainer>
        {attributes.map((attribute) => {
          if (attribute.type == "swatch") {
            return (
              <ProductAttributeSwatch
                lableFontSize={lableFontSize}
                optionWidth={optionWidth}
                key={attribute.id}
                selectedValue={productAttributes[attribute.id]}
                attribute={attribute}
                changeProductAttributes={changeProductAttributes}
              />
            );
          }
          return (
            <ProductAttributeGeneral
              lableFontSize={lableFontSize}
              optionWidth={optionWidth}
              key={attribute.id}
              selectedValue={productAttributes[attribute.id]}
              attribute={attribute}
              changeProductAttributes={changeProductAttributes}
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
