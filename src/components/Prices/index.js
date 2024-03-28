import { Component } from "react";
import Navbar from "../Navbar";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "INPROGRESS",
};

class Prices extends Component {
  state = { apiStatus: apiStatusConstants.initial, prices: [] };

  componentDidMount = async () => {
    this.setState({ apiStatus: apiStatusConstants.loading });
    const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const { bpi } = data;
      console.log(bpi);
      this.setState({ apiStatus: apiStatusConstants.success, prices: bpi });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderLoadingView = () => (
    <div className="home-total-cont">
      <Navbar />
      <div className="home-container">
        <Loader type="Bars" height="50" width="50" />
      </div>
    </div>
  );

  renderFailureView = () => (
    <div className="home-total-cont">
      <Navbar />
      <div className="home-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
          alt="failure"
          className="fail-img"
        />
        <p className="fail-text">
          Something went wrong. Please try again after some time
        </p>
      </div>
    </div>
  );

  renderSuccessView = () => {
    const { prices } = this.state;
    return (
      <div className="prices-container">
        <Navbar />
        <div className="prices-below-container">
          <h1>BITCOIN PRICES</h1>
          <div className="bitcoin-cards-container">
            <div className="card">
              <img
                src="https://res.cloudinary.com/digbzwlfx/image/upload/v1711556712/dollar_ilb7wr.jpg"
                alt="dollar"
                className="card-img"
              />
              <div className="card-content">
                <p>Code : {prices.USD.code}</p>
                <p>Rate : {prices.USD.rate}$</p>
                <p>Description : {prices.USD.description}</p>
              </div>
            </div>
            <div className="card">
              <img
                src="https://res.cloudinary.com/digbzwlfx/image/upload/v1711557072/euro_nnsvxs.png"
                className="card-img"
                alt="euro"
              />
              <div className="card-content space-left">
                <p>Code : {prices.EUR.code}</p>
                <p>Rate : {prices.EUR.rate}</p>
                <p>Description : {prices.EUR.description}</p>
              </div>
            </div>
            <div className="card">
              <img
                src="https://res.cloudinary.com/digbzwlfx/image/upload/v1711557152/pound_zfdq96.jpg"
                alt="pound"
                className="card-img"
              />
              <div className="card-content">
                <p>Code : {prices.GBP.code}</p>
                <p>Rate : {prices.GBP.rate}</p>
                <p>Description : {prices.GBP.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.loading:
        return this.renderLoadingView();
      default:
        return null;
    }
  }
}

export default Prices;
