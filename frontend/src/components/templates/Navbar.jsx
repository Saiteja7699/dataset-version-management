import React, { useState } from "react";
import { ReactComponent as CloseMenu } from "./x.svg";
import { ReactComponent as MenuIcon } from "./menu.svg";
import "./header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const navigate = useNavigate();

  const [publisher, setPublisher] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);
  const [unauth, setUnauth] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.getItem("user") != null) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user.group == "admin") {
        setAdmin(true);
        setUnauth(false);
      } else if (user.group == "publisher") {
        setPublisher(true);
        setUnauth(false);
      } else {
        setUnauth(true);
      }
    }
  }, []);

  const sendMessage2 = () => {
    axios
      .get("users/logout/", {
        headers: {
          Authorization:
            "Token " + JSON.parse(localStorage.getItem("user")).token,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("user");
        navigate("/");
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container">
          <a onClick={() => navigate(`/`)}>
            <IconButton>
              <Avatar
                alt="Data_Foundation_Logo"
                src="https://images.squarespace-cdn.com/content/v1/64e4e29725c04b3719d055ad/1692721851024-TQQ4RCABD66UNB4R5DW8/image-asset.png"
                variant="square"
              />
            </IconButton>{" "}
          </a>
        </div>

        <ul className={click ? "nav-options active" : "nav-options"}>
          {publisher && (
            <li className="option" onClick={closeMobileMenu}>
              <h4 onClick={() => navigate(`/newdataset`)}>NEW DATA SET</h4>
            </li>
          )}
          {publisher && (
            <li className="option" onClick={closeMobileMenu}>
              <h4 onClick={() => navigate(`/mydatasets`)}>MY DATA SETS</h4>
            </li>
          )}
          {publisher && (
            <li className="option" onClick={closeMobileMenu}>
              <h4 onClick={() => navigate(`/mypendingdatasets`)}>
                PENDING DATASETS
              </h4>
            </li>
          )}
          {!unauth && (
            <li className="option" onClick={closeMobileMenu}>
              <h4 onClick={sendMessage2}>LOGOUT</h4>
            </li>
          )}
        </ul>
      </div>
      {!unauth && (
        <div className="mobile-menu" onClick={handleClick}>
          {click ? (
            <CloseMenu className="menu-icon" />
          ) : (
            <MenuIcon className="menu-icon" />
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
