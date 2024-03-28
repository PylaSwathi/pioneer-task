import { Component } from "react";
import "./index.css";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png "
          className="not-found-img"
          alt="not-found"
        />
        <p>Page Not Found.</p>
      </div>
    );
  }
}

export default NotFound;
