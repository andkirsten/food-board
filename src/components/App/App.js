import React from "react";
import Navigationbar from "../Navbar/Navbar";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";
import FoodBoard from "../FoodBoard/FoodBoard";
import Popup from "../Popup/Popup";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddPost from "../AddPost/AddPost";
import "react-bootstrap";

import { AuthContextProvider } from "../../context/AuthContext";

function App() {
  const [isPopupOpen, setPopup] = React.useState(false);

  const [isAddPostPopupOpen, setAddPostPopup] = React.useState(false);

  const [isRegisterPopupOpen, setRegisterPopup] = React.useState(false);

  const [isSigninPopupOpen, setSigninPopup] = React.useState(false);

  const handlePopup = () => {
    setPopup(true);
    setSigninPopup(true);
    setRegisterPopup(false);
    setAddPostPopup(false);
  };
  const handleSigninPopup = () => {
    setPopup(true);
    setSigninPopup(true);
    setRegisterPopup(false);
    setAddPostPopup(false);
  };
  const handleRegisterPopup = () => {
    setPopup(true);
    setSigninPopup(false);
    setRegisterPopup(true);
    setAddPostPopup(false);
  };
  const handleAddPostPopup = () => {
    setPopup(true);
    setSigninPopup(false);
    setRegisterPopup(false);
    setAddPostPopup(true);
  };

  return (
    <div className="App">
      <AuthContextProvider>
        <Navigationbar
          handlePopup={handlePopup}
          handleSigninPopup={handleSigninPopup}
          handleRegisterPopup={handleRegisterPopup}
          handleAddPostPopup={handleAddPostPopup}
        />
        <Routes>
          <Route path="/" element={<FoodBoard />} />
          {/* <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addpost" element={<AddPost />} /> */}
        </Routes>

        {isSigninPopupOpen ? (
          <Popup
            setPopup={setPopup}
            setFormPopup={setSigninPopup}
            isPopupOpen={isPopupOpen}
          >
            <Signin
              setPopup={setPopup}
              setSigninPopup={setSigninPopup}
              setSignupPopup={setRegisterPopup}
            />
          </Popup>
        ) : (
          ""
        )}
        {isRegisterPopupOpen ? (
          <Popup
            setPopup={setPopup}
            setFormPopup={setSigninPopup}
            isPopupOpen={isPopupOpen}
          >
            <Register
              setPopup={setPopup}
              setSigninPopup={setSigninPopup}
              setSignupPopup={setRegisterPopup}
            />
          </Popup>
        ) : (
          ""
        )}
        {isAddPostPopupOpen ? (
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
      </AuthContextProvider>
    </div>
  );
}

export default App;
