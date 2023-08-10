import React, { useState } from "react";
import "./Signin.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../../Firebase";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  let auth = getAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Sign in the user
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      console.error("Error signing in:", error);
    }
    // Reset form fields
    setEmail("");
    setPassword("");
  };

  function toggleSignupPopup() {
    props.setPopup(true);
    props.setSigninPopup(false);
    props.setSignupPopup(true);
  }

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="signin-email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="signin-password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Signin</button>
        <button type="button" onClick={toggleSignupPopup}>
          Sign Up
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signin;
