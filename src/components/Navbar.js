import React from "react";
import { Image, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./app.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Header">
      <div className="sub-header">
        <div className="nav-wrapper">
          <div className="logo">
            <Link to="/">
              <Image
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                wrapped
                ui={false}
              />
            </Link>
          </div>
          <div className="urls">
            <Link to="/movies">Filmler</Link>
            <Link to="/series">Diziler</Link>
            <Link to="/persons">Kişiler</Link>
          </div>

          <div className="loginbtn">
            <Link to="/register">
              <Icon name="add" />{" "}
            </Link>
            <Link to="/login">
              <Icon name="sign-in" />{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
