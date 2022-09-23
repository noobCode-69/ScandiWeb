import styled from 'styled-components';

export const StyledProductCard = styled.div`
  position: relative;
  color: #43464e;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: space-between;

  padding: 1rem;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  }

  height: 325px;

  & .img-container {
    height: 70%;
    position: relative;
  }

  & .img-container img {
    object-fit: contain;
  }

 

  & .front-backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  

  & .info-container__product-brand {
    font-weight: 600;
  }

  @media (max-width: 675px) {
    height: 325px;
    width: 275px;
  }
`;
