import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const navBar = () => {
  return (
    <div className="navigationBar">
      <div>
        <NavLink to="/" className="navItem">
          Home
        </NavLink>
      </div>
      <div>
        <NavLink to="/sign-in" className="navItem" >
          Sign in
        </NavLink>
      </div>
    </div>
  );
};

export default navBar;
