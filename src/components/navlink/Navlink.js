import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./Navlink.module.css";

class Navlink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isActive, url, onClick, text } = this.props;

    return (
      <Link
        className={isActive == true ? style.active : style.inactive}
        to={url}
        onClick={() => onClick(this.props.text)}
      >
        {text.toUpperCase()}
      </Link>
    );
  }
}

export default Navlink;
