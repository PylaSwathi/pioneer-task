import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoPricetagsOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdClose } from "react-icons/md";

import "./index.css";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isMobileHamburger, setIsMobileHamburger] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1]; // Get the first part of the pathname
    console.log(path);
    setActive(path || ""); // If path is empty, set default active to 'home'
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileHamburger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  const changeMobileHamburger = () => {
    setIsMobileHamburger((prevState) => !prevState);
  };

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-logo-section">
          <img
            src="https://res.cloudinary.com/digbzwlfx/image/upload/v1711472150/carbon-logo_cgurvp.png"
            alt="website-logo"
            className="website-logo"
          />
          <GiHamburgerMenu
            style={{ color: "#ffffff", fontSize: "25px" }}
            onClick={changeMobileHamburger}
          />
        </div>
        <div className="search-section">
          <IoSearchOutline className="search-icon" />
          <input type="search" className="search-input" placeholder="Search" />
        </div>
        <ul className="nav-items-container">
          <li className={active === "" ? "nav-item active" : "nav-item"}>
            <Link to="/" className="nav-link">
              <GoHome className="nav-item-icon" />
              <p className="title">Home</p>
            </Link>
          </li>
          <li className={active === "prices" ? "nav-item active" : "nav-item"}>
            <Link to="/prices" className="nav-link">
              <IoPricetagsOutline className="nav-item-icon" />
              <p className="title">Prices</p>
            </Link>
          </li>
          <li className={active === "wallet" ? "nav-item active" : "nav-item"}>
            <Link to="/wallet" className="nav-link">
              <IoWalletOutline className="nav-item-icon" />
              <p className="title">Wallet</p>
            </Link>
          </li>
        </ul>
        <ul className="nav-items-below-container">
          <li
            className={
              active === "notifications" ? "nav-item active" : "nav-item"
            }
          >
            <Link to="/notifications" className="nav-link di">
              <IoNotificationsOutline className="nav-item-icon" />
              <p className="title2">Notifications</p>
              <span className="notifications">2</span>
            </Link>
          </li>
          <li
            className={active === "settings" ? "nav-item active" : "nav-item"}
          >
            <Link to="/settings" className="nav-link">
              <IoSettingsOutline className="nav-item-icon" />
              <p className="title2">settings</p>
            </Link>
          </li>
        </ul>
        <div className="profile-section">
          <img
            src="https://res.cloudinary.com/digbzwlfx/image/upload/v1711519413/avatar_o7s28j.png"
            alt="avatar"
            className="avatar"
          />
          <div className="avatar-name-sec">
            <h5>Brooklyn Simmons</h5>
            <p>brooklyn@simmons.com</p>
          </div>
          <BsThreeDotsVertical className="dots-icon" />
        </div>
      </div>
      <div
        className="mobile-navbar-container"
        style={{ height: isMobileHamburger ? "auto" : "100vh" }}
      >
        <div className="navbar-logo-section">
          <img
            src="https://res.cloudinary.com/digbzwlfx/image/upload/v1711472150/carbon-logo_cgurvp.png"
            alt="website-logo"
            className="website-logo"
          />

          {isMobileHamburger ? (
            <GiHamburgerMenu
              style={{ color: "#ffffff", fontSize: "20px" }}
              onClick={changeMobileHamburger}
            />
          ) : (
            <MdClose
              style={{ color: "#ffffff", fontSize: "20px" }}
              onClick={changeMobileHamburger}
            />
          )}
        </div>
        {!isMobileHamburger && (
          <div className="mobile-below-section">
            <div className="search-section">
              <IoSearchOutline className="search-icon" />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
              />
            </div>
            <ul className="nav-items-container">
              <li className={active === "" ? "nav-item active" : "nav-item"}>
                <Link to="/" className="nav-link">
                  <GoHome className="nav-item-icon" />
                  <p className="title">Home</p>
                </Link>
              </li>
              <li
                className={active === "prices" ? "nav-item active" : "nav-item"}
              >
                <Link to="/prices" className="nav-link">
                  <IoPricetagsOutline className="nav-item-icon" />
                  <p className="title">Prices</p>
                </Link>
              </li>
              <li
                className={active === "wallet" ? "nav-item active" : "nav-item"}
              >
                <Link to="/wallet" className="nav-link">
                  <IoWalletOutline className="nav-item-icon" />
                  <p className="title">Wallet</p>
                </Link>
              </li>
            </ul>
            <ul className="nav-items-below-container">
              <li
                className={
                  active === "notifications" ? "nav-item active" : "nav-item"
                }
              >
                <Link to="/notifications" className="nav-link di">
                  <IoNotificationsOutline className="nav-item-icon" />
                  <p className="title2">Notifications</p>
                  <span className="notifications">2</span>
                </Link>
              </li>
              <li
                className={
                  active === "settings" ? "nav-item active" : "nav-item"
                }
              >
                <Link to="/settings" className="nav-link">
                  <IoSettingsOutline className="nav-item-icon" />
                  <p className="title2">settings</p>
                </Link>
              </li>
            </ul>
            <div className="profile-section">
              <img
                src="https://res.cloudinary.com/digbzwlfx/image/upload/v1711519413/avatar_o7s28j.png"
                alt="avatar"
                className="avatar"
              />
              <div className="avatar-name-sec">
                <h5>Brooklyn Simmons</h5>
                <p>brooklyn@simmons.com</p>
              </div>
              <BsThreeDotsVertical className="dots-icon" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
