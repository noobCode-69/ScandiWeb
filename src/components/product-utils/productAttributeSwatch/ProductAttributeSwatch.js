import React, { Component } from 'react';
import styled from 'styled-components';
import style from './ProductAttributeSwatch.module.css';

class ProductAttributeSwatch extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <div className={style['attribute-container']}>
        <p
          style={{ fontSize: `${this.props.lableFontSize}` }}
          className={style.label}
        >
          {this.props.attribute.name.toUpperCase()}
        </p>
        <div className={style.options}>
          {this.props.attribute.items.map((option) => (
            <div
              className={`${style.option}  ${
                option.id == this.props.selectedValue ? style.active : null
              } `}
              style={{
                width: `${this.props.optionWidth}`,
                background: `${option.value} content-box`,
              }}
              key={option.id}
              onClick={() => this.props.changeProductAttributes(
                this.props.attribute.id,
                option.id,
              )}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductAttributeSwatch;
