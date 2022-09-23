import React, { Component } from "react";
import style from "./ProductAttributeGeneral.module.css";

class ProductAttributeGeneral extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      selectedValue,
      changeProductAttributes,
      attribute,
      optionWidth,
      lableFontSize,
    } = this.props;

    return (
      <div className={style["attribute-container"]}>
        <p className={style.label} style={{ fontSize: `${lableFontSize}` }}>
          {attribute.name.toUpperCase()}
        </p>
        <div className={style.options}>
          {attribute.items.map((option) => (
            <div
              style={{ width: `${optionWidth}` }}
              className={`${style.option}  ${
                option.id == selectedValue ? style.active : null
              } `}
              key={option.id}
              onClick={() => changeProductAttributes(attribute.id, option.id)}
            >
              <p>{option.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductAttributeGeneral;
