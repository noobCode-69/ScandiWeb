import React, { Component } from "react";
import styled from "styled-components";

class ProductCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
    };
  }

  changeCurrentImage(left) {
    const { images } = this.props;

    if (left == true) {
      this.setState((prevState) => {
        return {
          ...prevState,
          currentImage:
            (prevState.currentImage - 1 + images.length) % images.length,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          currentImage: (prevState.currentImage + 1) % images.length,
        };
      });
    }
  }

  render() {
    const { images } = this.props;
    const { currentImage } = this.state;

    return (
      <StyleCarousel
        singleImage={images.length == 1}
        bgimg={images[currentImage]}
      >
        {images.length > 1 && (
          <div className="carousel-buttons">
            {" "}
            <div
              onClick={() => this.changeCurrentImage(true)}
              className="carousel-button"
            >
              {"<"}
            </div>
            <div
              onClick={() => this.changeCurrentImage(false)}
              className="carousel-button"
            >
              {">"}
            </div>
          </div>
        )}
      </StyleCarousel>
    );
  }
}

const StyleCarousel = styled.div`
  width: 150px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${({ bgimg }) => bgimg});
  background-origin: content-box;
  position: relative;
  aspect-ratio: 0.9;

  & .carousel-buttons {
    position: absolute;
    width: 100%;
    bottom: 5%;
    display: flex;
    gap: 1rem;
    padding-right: 0.5rem;
    justify-content: flex-end;
  }

  & .carousel-button {
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }

  & .carousel-button:hover {
    cursor: ${({ singleImage }) =>
      singleImage == true ? "not-allowed" : "pointer"};
  }
`;

export default ProductCarousel;
