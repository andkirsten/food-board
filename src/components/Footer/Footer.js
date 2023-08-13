import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} FoodShare Inc.</p>
        <p>
          A TripleTen CodeJam Project developed by Josh Keller, and Kirsten
          Andersen Morris.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
