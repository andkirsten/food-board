import React from "react";
import "./Navbar.css";
import logo from "../../FoodShareLogo.png";

function Navbar(props) {
  function toggleSigninPopup() {
    props.setPopup(true);
    props.setSigninPopup(true);
    props.setSignupPopup(false);
  }
  function toggleNewPostPopup() {
    props.setPopup(true);
    props.setAddPostPopup(true);
    console.log("TEST");
  }

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <h1>Food Board</h1>
      <div className="links">
        {props.isLoggedIn ? (
          <div>
            <button
              // onClick={handleSignout}
              className={`header__logout }`}
            >
              Log Out
              {/* {`${currentUser.name}`} */}
            </button>
            {/* <a href="/create">New Post</a> */}
            <button onClick={toggleNewPostPopup}>New Post</button>
          </div>
        ) : (
          <button
            // onClick={togglePopup}
            onClick={toggleSigninPopup}
            className="header__signin"
          >
            Sign in
          </button>
        )}

        {/* <a href="/signin">Signin</a> */}
        {/* <a href="/create">New Post</a> */}
      </div>
    </div>
  );
}

export default Navbar;
