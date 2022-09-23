import React, { Component } from "react";
import style from "./ProductAttributeSwatch.module.css";

class ProductAttributeSwatch extends Component {
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
        <p style={{ fontSize: `${lableFontSize}` }} className={style.label}>
          {attribute.name.toUpperCase()}
        </p>
        <div className={style.options}>
          {attribute.items.map((option) => (
            <div
              className={`${style.option}  ${
                option.id == selectedValue ? style.active : null
              } `}
              style={{
                width: `${optionWidth}`,
                background: `${option.value} content-box`,
              }}
              key={option.id}
              onClick={() => changeProductAttributes(attribute.id, option.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductAttributeSwatch;
