import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDown from '../hoc/DropDown';
import style from './Currency.module.css';
import { updateCurrency } from '../../redux/actions';
import { fetchCurrencies } from '../../utils/api';
import withRouter from '../hoc/withRouter';

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: null,
    };
  }

  async componentDidMount() {
    const data = await fetchCurrencies();
    if (data.error != undefined) {
      this.props.navigate('/error');
      return;
    }

    this.setState({
      ...this.state,
      currencies: data.data.currencies,
    });

    if (
      this.props.selectedCurrency == null
      || this.props.selectedCurrency == undefined
    ) {
      this.props.updateCurrency({
        label: data.data.currencies[0].label,
        symbol: data.data.currencies[0].symbol,
      });
    }
  }

  onClickOutside = () => {
    this.props.toggle();
  };

  render() {
    if (
      this.state.currencies == null
      || this.props.selectedCurrency == null
      || this.props.selectedCurrency == undefined
    ) {
      return null;
    }

    return (
      <div style={{ position: 'relative' }}>
        {this.props.isOpen == true && (
          <div className={style.backdrop} onClick={this.onClickOutside} />
        )}

        <div
          className={style['currency-icon-container']}
          onClick={this.props.toggle}
        >
          <p>{this.props.selectedCurrency.symbol}</p>
          {this.props.isOpen == false ? (
            <div className={style['svg-container']}>
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0.5L4 3.5L7 0.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div className={style['svg-container']}>
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 3.5L4 0.5L7 3.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        {this.props.isOpen == true && (
          <div className={style['options-container']}>
            {this.state.currencies.map((currency) => (
              <div
                className={style.option}
                onClick={() => {
                  this.props.updateCurrency({
                    label: currency.label,
                    symbol: currency.symbol,
                  });
                  this.props.toggle();
                }}
                key={currency.label}
              >
                {currency.symbol}
                {' '}
                {currency.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});

export default withRouter(
  DropDown(connect(mapStateToProps, { updateCurrency })(Currency)),
);
