import React from "react";
import "./Navbar.css";
import logo from "../../logoWhite.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NavigationBar(props) {
  const handleOpenSigninPopup = () => {
    props.setPopup(true);
    props.setSigninPopup(true);
    props.setRegisterPopup(false);
    props.setAddPostPopup(false);
  };

  const handleOpenAddPostPopup = () => {
    props.setPopup(true);
    props.setAddPostPopup(true);
  };

  const handleSigninButton = () => {
    handleOpenSigninPopup();
  };
  const handleAddPostButton = () => {
    handleOpenAddPostPopup();
  };

  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await logOut();

      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{ backgroundSize: "0", backgroundColor: "#709345" }}
      sticky="top"
    >
      <Container className="nav">
        <Navbar.Brand href="/" className="brand">
          <img src={logo} alt="foodshare logo" className="logo" /> FoodShare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {user ? (
            <Nav>
              <Nav.Link href="/">Food Board</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link onClick={handleAddPostButton}>New Post</Nav.Link>
              <Nav.Link onClick={handleSignout}>Log Out</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/">Food Board</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link onClick={handleSigninButton}>Sign In</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
