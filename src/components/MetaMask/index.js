import React, { Component } from "react";
import Navbar from "../Navbar";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Web3 from "web3";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "INPROGRESS",
};

class MetaMaskIntegration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      errorMessage: "",
      apiStatus: apiStatusConstants.initial,
    };
  }

  componentDidMount = () => {
    this.setState({ apiStatus: apiStatusConstants.success });
  };

  connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        // Check if connected
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          this.setState({ isConnected: true, errorMessage: "" });
        }
      } else {
        this.setState({
          isConnected: false,
          errorMessage: "MetaMask extension not detected.",
        });
      }
    } catch (error) {
      this.setState({ isConnected: false, errorMessage: error.message });
    }
  };

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

  renderLoadingView = () => (
    <div className="home-total-cont">
      <Navbar />
      <div className="home-container">
        <Loader type="Bars" height="50" width="50" />
      </div>
    </div>
  );

  renderSuccessView = () => {
    const { isConnected, errorMessage } = this.state;
    return (
      <div className="metamask-container">
        <Navbar />
        <div className="metamask-below-container">
          <img
            src="https://res.cloudinary.com/digbzwlfx/image/upload/v1711606974/metamask-cropped_fjg94e.jpg"
            alt="metamask"
            className="metamask-img"
          />
          <button onClick={this.connectWallet} className="button">
            Connect Wallet
          </button>
          {isConnected && (
            <p className="para">Wallet connected successfully!</p>
          )}
          {errorMessage && <p className="para-error">*{errorMessage}</p>}
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

export default MetaMaskIntegration;
