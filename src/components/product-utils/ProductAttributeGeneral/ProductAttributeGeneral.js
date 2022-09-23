import React, { Component } from 'react';
import style from './ProductAttributeGeneral.module.css';

class ProductAttributeGeneral extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style['attribute-container']}>
        <p
          className={style.label}
          style={{ fontSize: `${this.props.lableFontSize}` }}
        >
          {this.props.attribute.name.toUpperCase()}
        </p>
        <div className={style.options}>
          {this.props.attribute.items.map((option) => (
            <div
              style={{ width: `${this.props.optionWidth}` }}
              className={`${style.option}  ${
                option.id == this.props.selectedValue ? style.active : null
              } `}
              key={option.id}
              onClick={() => this.props.changeProductAttributes(
                this.props.attribute.id,
                option.id,
              )}
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
