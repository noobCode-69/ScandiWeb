import React, { useState } from 'react';

const DropDown = (Component) => {
  function Wrapper(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };

    return <Component isOpen={isOpen} toggle={toggle} {...props} />;
  }

  return Wrapper;
};

export default DropDown;
