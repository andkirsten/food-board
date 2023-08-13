import React, { useState } from "react";

import "./Register.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/AuthContext";

const Registration = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { register } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function mapAuthCodeToMessage(authCode) {
    switch (authCode) {
      case "auth/email-already-in-use":
        return "Email already in use";
      case "auth/invalid-email":
        return "Invalid email";
      case "auth/weak-password":
        return "Password must be at least 6 characters long";
      default:
        return "Unknown error";
    }
  }

  const registerUser = async (event) => {
    event.preventDefault();
    setError(null);
    props.setLoad(true);
    try {
      await register(email, password);

      setError(null);
      setEmail("");
      setPassword("");
      setError(null);
      props.setPopup(false);
      props.setLoad(false);
    } catch (e) {
      setError(mapAuthCodeToMessage(e.code));
      console.error("Error signing in:", e);
      props.setLoad(false);
    }
  };

  return (
    <div>
      <Form onSubmit={registerUser}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={handlePasswordChange}
          />
        </Form.Group>
        {error && <p className="error">Error: {error}</p>}
        <Button
          variant="primary"
          type="submit"
          className="register__submit"
          disabled={props.load}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Registration;
