import { Component } from "react";
import Navbar from "../Navbar";

class Settings extends Component {
  render() {
    return (
      <div className="notifications-cont">
        <Navbar />
        <div className="notifications-below-cont">
          <p>This is Settings Section</p>
        </div>
      </div>
    );
  }
}

export default Settings;
