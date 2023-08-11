import React from "react";
import "./Navbar.css";
import logo from "../../FoodShareLogo.png";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NavigationBar(props) {
  // function toggleSigninPopup() {
  //   props.setPopup(true);
  //   props.setSigninPopup(true);
  //   props.setSignupPopup(false);
  // }
  // function toggleNewPostPopup() {
  //   props.setPopup(true);
  //   props.setAddPostPopup(true);
  // }

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
              {`${user.name}`}
            </Button>
            <Button onClick={props.handleAddPostPopup}>New Post</Button>
          </div>
        ) : (
          <Button onClick={props.handleSigninPopup} className="header__signin">
            Sign in
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
  // <div className="navbar">
  //   <img src={logo} alt="logo" className="logo" />
  //   <h1>Food Board</h1>
  //   <div className="links">
  //     {props.isLoggedIn ? (
  //       <div>
  //         <Button
  //           // onClick={handleSignout}
  //           className={`header__logout }`}
  //         >
  //           Log Out
  //           {/* {`${currentUser.name}`} */}
  //         </Button>
  //         {/* <a href="/create">New Post</a> */}
  //         <Button onClick={toggleNewPostPopup}>New Post</Button>
  //       </div>
  //     ) : (
  //       <Button onClick={toggleSigninPopup} className="header__signin">
  //         Sign in
  //       </Button>
  //     )}

  //     {/* <a href="/signin">Signin</a> */}
  //     {/* <a href="/create">New Post</a> */}
  //   </div>
  // </div>
  // );
}

export default NavigationBar;
