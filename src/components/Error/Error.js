import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class Error extends Component {
  render() {
    return (
      <StyledErrorContainer>
        <div className="error-img-container">
          <img
            alt="error-message"
            src="
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSq2uIs4HTueZDR6q4jEejWpVRiGAmAL2Bww&usqp=CAU"
          />
        </div>
        <div className="error-message">
          <h1>Something Went Wrong</h1>
        </div>
        <Link to="/">HOME</Link>
      </StyledErrorContainer>
    );
  }
}

const StyledErrorContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  & .error-img-container {
    width: 375px;
  }
`;

export default Error;
