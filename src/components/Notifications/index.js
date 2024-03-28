import { Component } from "react";
import Navbar from "../Navbar";

import "./index.css";

class Notifications extends Component {
  render() {
    return (
      <div className="notifications-cont">
        <Navbar />
        <div className="notifications-below-cont">
          <p>This is Notification Section</p>
        </div>
      </div>
    );
  }
}

export default Notifications;
