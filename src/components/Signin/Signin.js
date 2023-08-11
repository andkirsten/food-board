import React, { useState } from "react";
import "./Signin.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { logIn } = useAuth();
  const navigate = useNavigate();

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
      await logIn(email, password);
      console.log("User signed in successfully!");
      setError(null); // Clear any previous errors
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error signing in:", error);
    }
    // Reset form fields
    setEmail("");
    setPassword("");
    setError(null);
    props.setPopup(false);
  };

  function toggleSignupPopup() {
    props.setPopup(true);
    props.setSigninPopup(false);
    props.setSignupPopup(true);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button type="submit">Signin</Button>
        <Button type="button" onClick={toggleSignupPopup}>
          Sign Up
        </Button>
      </Form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signin;
