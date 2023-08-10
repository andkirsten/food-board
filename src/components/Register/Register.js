import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.css";
import { getAuth } from "firebase/auth";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    console.log("Registration component is mounted");
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const registerUser = async (event) => {
    event.preventDefault();
    let auth = getAuth();
    try {
      // Create a new user
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User is created: ");
        })
        .catch((error) => {
          console.log(error);
        });

      // Reset form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
