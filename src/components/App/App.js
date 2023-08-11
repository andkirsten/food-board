import React from "react";
import Navbar from "../Navbar/Navbar";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";
import FoodBoard from "../FoodBoard/FoodBoard";
import Popup from "../Popup/Popup";

import "./App.css";
import AddPost from "../AddPost/AddPost";
import "../../Firebase";

function App() {
  const [isPopupOpen, setPopup] = React.useState(false);
  const [isSigninPopupOpen, setSigninPopup] = React.useState(false);
  const [isSignupPopupOpen, setSignupPopup] = React.useState(false);
  const [isAddPostPopupOpen, setAddPostPopup] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        setPopup={setPopup}
        setSigninPopup={setSigninPopup}
        setSignupPopup={setSignupPopup}
        setAddPostPopup={setAddPostPopup}
      />
      <FoodBoard />
      {/* <Signin /> */}
      {/* <Register /> */}
      {/* <AddPost /> */}
      {isSigninPopupOpen ? (
        <Popup
          setPopup={setPopup}
          setFormPopup={setSigninPopup}
          isPopupOpen={isPopupOpen}
        >
          <Signin
            setPopup={setPopup}
            setSigninPopup={setSigninPopup}
            setSignupPopup={setSignupPopup}
          />
        </Popup>
      ) : (
        ""
      )}
      {isSignupPopupOpen ? (
        <Popup
          setPopup={setPopup}
          setFormPopup={setSigninPopup}
          isPopupOpen={isPopupOpen}
        >
          <Register
            setPopup={setPopup}
            setSigninPopup={setSigninPopup}
            setSignupPopup={setSignupPopup}
          />
        </Popup>
      ) : (
        ""
      )}
      {isLoggedIn && isAddPostPopupOpen ? (
        <Popup
          setPopup={setPopup}
          setFormPopup={setSigninPopup}
          isPopupOpen={isPopupOpen}
        >
          <AddPost setPopup={setPopup} />
        </Popup>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
