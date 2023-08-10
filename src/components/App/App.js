import React from "react";
import Navbar from "../Navbar/Navbar";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";
import FoodBoard from "../FoodBoard/FoodBoard";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <FoodBoard />
      <Signin />
      <Register />
    </div>
  );
}

export default App;
