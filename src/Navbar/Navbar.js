import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <h1>Food Board</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/create">New Recipe</a>
      </div>
    </div>
  );
}

export default Navbar;
