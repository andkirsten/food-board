import React from "react";
import Navigationbar from "../Navbar/Navbar";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";
import FoodBoard from "../FoodBoard/FoodBoard";
import Popup from "../Popup/Popup";
import Footer from "../Footer/Footer";
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

  const [load, setLoad] = React.useState(false);

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
        <Footer />

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
              load={load}
              setLoad={setLoad}
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
              load={load}
              setLoad={setLoad}
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
            <AddPost setPopup={setPopup} load={load} setLoad={setLoad} />
          </Popup>
        ) : (
          ""
        )}
      </AuthContextProvider>
    </div>
  );
}

export default App;
