import React, { Component } from "react";
import { connect } from "react-redux";
import DropDown from "../hoc/DropDown";
import style from "./Currency.module.css";
import { updateCurrency as updateCurrencyAction } from "../../redux/actions";
import { fetchCurrencies } from "../../utils/api";
import withRouter from "../hoc/withRouter";

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: null,
    };
  }

  async componentDidMount() {
    const {
      navigate,
      selectedCurrency,
      updateCurrencyAction: updateCurrency,
    } = this.props;

    const data = await fetchCurrencies();
    if (data.error !== undefined) {
      navigate("/error");
      return;
    }

    const { currencies } = data.data;

    this.setState((prevProps) => {
      return {
        ...prevProps,
        currencies: data.data.currencies,
      };
    });

    if (selectedCurrency === null || selectedCurrency === undefined) {
      updateCurrency({
        label: currencies[0].label,
        symbol: currencies[0].symbol,
      });
    }
  }

  onClickOutside = () => {
    const { toggle } = this.props;
    toggle();
  };

  render() {
    const {
      selectedCurrency,
      isOpen,
      toggle,
      updateCurrencyAction: updateCurrency,
    } = this.props;
    const { currencies } = this.state;

    if (
      currencies === null ||
      selectedCurrency === null ||
      selectedCurrency === undefined
    ) {
      return null;
    }

    return (
      <div style={{ position: "relative" }}>
        {isOpen === true && (
          <div className={style.backdrop} onClick={this.onClickOutside} />
        )}

        <div className={style["currency-icon-container"]} onClick={toggle}>
          <p>{selectedCurrency.symbol}</p>
          {isOpen === false ? (
            <div className={style["svg-container"]}>
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
            <div className={style["svg-container"]}>
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

        {isOpen === true && (
          <div className={style["options-container"]}>
            {currencies.map((currency) => (
              <div
                className={style.option}
                onClick={() => {
                  updateCurrency({
                    label: currency.label,
                    symbol: currency.symbol,
                  });
                  toggle();
                }}
                key={currency.label}
              >
                {currency.symbol} {currency.label}
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
  DropDown(connect(mapStateToProps, { updateCurrencyAction })(Currency))
);
