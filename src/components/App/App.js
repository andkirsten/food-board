import React from "react";
import Navigationbar from "../Navbar/Navbar";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";
import FoodBoard from "../FoodBoard/FoodBoard";
import Popup from "../Popup/Popup";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddPost from "../AddPost/AddPost";
import About from "../About/About";

import { AuthContextProvider } from "../../context/AuthContext";

function App() {
  const [isPopupOpen, setPopup] = React.useState(false);

  const [isAddPostPopupOpen, setAddPostPopup] = React.useState(false);

  const [isRegisterPopupOpen, setRegisterPopup] = React.useState(false);

  const [isSigninPopupOpen, setSigninPopup] = React.useState(false);

  return (
    <div className="App">
      <AuthContextProvider>
        <Navigationbar
          setPopup={setPopup}
          setSigninPopup={setSigninPopup}
          setRegisterPopup={setRegisterPopup}
          setAddPostPopup={setAddPostPopup}
        />
        <Routes>
          <Route path="/" element={<FoodBoard />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {isSigninPopupOpen ? (
          <Popup
            setPopup={setPopup}
            setFormPopup={setSigninPopup}
            isPopupOpen={isPopupOpen}
            title={"Sign In"}
          >
            <Signin
              setPopup={setPopup}
              setSigninPopup={setSigninPopup}
              setSignupPopup={setRegisterPopup}
              setAddPostPopup={setAddPostPopup}
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
            title={"Sign Up"}
          >
            <Register
              setPopup={setPopup}
              setSigninPopup={setSigninPopup}
              setSignupPopup={setRegisterPopup}
              setAddPostPopup={setAddPostPopup}
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
            title={"Add Post"}
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
