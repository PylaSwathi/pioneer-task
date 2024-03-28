import { Component } from "react";
import Loader from "react-loader-spinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../Navbar/index";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "INPROGRESS",
};

class Home extends Component {
  state = { apiStatus: apiStatusConstants.initial, populationData: [] };

  dataFormatter = (number) => {
    if (number >= 1e7) {
      const crores = number / 1e7;
      return `${crores.toFixed(1)} Cr`;
    }
    return number.toString();
  };

  componentDidMount = async () => {
    this.setState({ apiStatus: apiStatusConstants.loading });
    const apiUrl =
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
    const response = await fetch(apiUrl);
    if (response.ok) {
      const responseData = await response.json();
      const { data } = responseData;
      this.setState({
        apiStatus: apiStatusConstants.success,
        populationData: data,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
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
    const { populationData } = this.state;
    const sortedPopulationData = populationData
      .slice()
      .sort((a, b) => a["ID Year"] - b["ID Year"]);

    const maxPopulation = Math.max(
      ...populationData.map((entry) => entry.Population)
    );

    const minDomain = 30 * 10000000;
    const maxDomain = Math.max(maxPopulation, minDomain);
    return (
      <div className="home-total-cont">
        <Navbar />
        <div className="home-container">
          <h1 className="home-title"> UNITED STATES POPULATION </h1>
          <div className="graph-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedPopulationData}
                margin={{
                  top: 5,
                }}
              >
                <XAxis
                  dataKey="ID Year"
                  tick={{
                    stroke: "gray",
                    strokeWidth: 0,
                  }}
                />
                <YAxis
                  dataKey="Population"
                  tickFormatter={(value) => this.dataFormatter(value)}
                  tick={{
                    stroke: "gray",
                    strokeWidth: 0,
                  }}
                  domain={[minDomain, maxDomain]}
                />
                <Legend
                  wrapperStyle={{
                    padding: 30,
                  }}
                  align="right"
                />
                <Bar
                  dataKey="Population"
                  name="Population"
                  fill="#AD1457"
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="legand-t">Nation:US</p>
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

export default Home;
