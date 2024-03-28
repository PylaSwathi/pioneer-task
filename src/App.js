import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/index";
import Prices from "./components/Prices/index";
import MetaMaskIntegration from "./components/MetaMask";
import Notifications from "./components/Notifications";
import NotFound from "./components/NotFound/index";
import Settings from "./components/Settings";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/prices" Component={Prices} />
          <Route exact path="/wallet" Component={MetaMaskIntegration} />
          <Route exact path="/not-found" Component={NotFound} />
          <Route exact path="/notifications" Component={Notifications} />
          <Route exact path="/settings" Component={Settings} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
