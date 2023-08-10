import React from "react";
import Navbar from "../Navbar/Navbar";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";
import FoodBoard from "../FoodBoard/FoodBoard";

import "./App.css";
import AddPost from "../AddPost/AddPost";
import "../../Firebase";

function App() {
  return (
    <div className="App">
      <Navbar />
      <FoodBoard />
      <Signin />
      <Register />
      <AddPost />
    </div>
  );
}

export default App;
