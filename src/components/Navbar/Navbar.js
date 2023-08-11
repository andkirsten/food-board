import React from "react";
import "./Navbar.css";
import logo from "../../FoodShareLogo.png";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NavigationBar(props) {
  const handleOpenSigninPopup = () => {
    props.setPopup(true);
    props.setSigninPopup(true);
    props.setRegisterPopup(false);
  };

  const handleOpenAddPostPopup = () => {
    props.setPopup(true);
    props.setAddPostPopup(true);
  };

  const handleSigninButton = () => {
    handleOpenSigninPopup();
    console.log("Sign in Button Clicked");
  };
  const handleAddPostButton = () => {
    handleOpenAddPostPopup();
    console.log("Add Post Button Clicked");
  };

  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await logOut();
      console.log("User signed out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-light">
      <Navbar.Brand href="/">
        <img src={logo} alt="logo" className="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {user ? (
          <div>
            <Button onClick={handleSignout} className={`header__logout }`}>
              Log Out
            </Button>
            <Button onClick={handleAddPostButton}>New Post</Button>
          </div>
        ) : (
          <Button onClick={handleSigninButton} className="header__signin">
            Sign in
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
