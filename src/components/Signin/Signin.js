import React, { useState } from "react";
import "./Signin.css";
import { useAuth } from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { logIn } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function mapAuthCodeToMessage(authCode) {
    switch (authCode) {
      case "auth/invalid-email":
        return "Invalid email";
      case "auth/user-disabled":
        return "User disabled";
      case "auth/user-not-found":
        return "User not found";
      case "auth/wrong-password":
        return "Wrong password";
      default:
        return "Unknown error";
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await logIn(email, password);
      setEmail("");
      setPassword("");
      setError(null);
      props.setPopup(false);
      props.setSigninPopup(false);
    } catch (e) {
      setError(mapAuthCodeToMessage(e.code));
    }
  };

  function toggleSignupPopup() {
    props.setPopup(true);
    props.setSigninPopup(false);
    props.setSignupPopup(true);
    props.setAddPostPopup(false);
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
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>
        {error && <p className="error">{error}</p>}
        <Button type="submit" className="signin__submit">
          Signin
        </Button>
      </Form>
      <p>
        Don't have an account yet?
        <Button
          variant="link"
          onClick={toggleSignupPopup}
          className="signin__signup"
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
};

export default Signin;
