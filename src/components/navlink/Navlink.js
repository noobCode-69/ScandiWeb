import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Navlink.module.css';

class Navlink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link
        className={this.props.isActive == true ? style.active : style.inactive}
        to={this.props.url}
        onClick={() => this.props.onClick(this.props.text)}
      >
        {this.props.text.toUpperCase()}
      </Link>
    );
  }
}

export default Navlink;
