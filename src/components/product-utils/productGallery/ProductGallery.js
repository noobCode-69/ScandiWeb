import React, { Component } from 'react';
import style from './ProductGallery.module.css';

class ProductGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinnedImage: this.props.images[0],
    };
  }

  render() {
    if (this.state.pinnedImage == null) {
      return null;
    }
    return (
      <div className={style['gallery-container']}>
        <div className={style['unpinned-img-container']}>
          {this.props.images.map((imageUrl) => (
            <div
              key={imageUrl}
              onClick={() => this.setState({ ...this.state, pinnedImage: imageUrl })}
            >
              <img src={imageUrl} />
            </div>
          ))}
        </div>

        <div className={style['pinned-img-container']}>
          <img src={this.state.pinnedImage} />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
