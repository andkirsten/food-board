import React from "react";
import "./Navbar.css";
import logo from "../../FoodShareLogo.png";

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <h1>Food Board</h1>
      <div className="links">
        <a href="/signin">Signin</a>
        <a href="/create">New Post</a>
      </div>
    </div>
  );
}

export default Navbar;
