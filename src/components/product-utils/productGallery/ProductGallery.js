import React, { Component } from "react";
import style from "./ProductGallery.module.css";

class ProductGallery extends Component {
  constructor(props) {
    super(props);
    const { images } = this.props;
    this.state = {
      pinnedImage: images[0],
    };
  }

  render() {
    const { images } = this.props;
    const { pinnedImage } = this.state;

    if (pinnedImage == null) {
      return null;
    }
    return (
      <div className={style["gallery-container"]}>
        <div className={style["unpinned-img-container"]}>
          {images.map((imageUrl) => (
            <div
              key={imageUrl}
              onClick={() =>
                this.setState((prevState) => {
                  return { ...prevState, pinnedImage: imageUrl };
                })
              }
            >
              <img src={imageUrl} />
            </div>
          ))}
        </div>

        <div className={style["pinned-img-container"]}>
          <img src={pinnedImage} />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
