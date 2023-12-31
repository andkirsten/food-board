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
    props.setLoad(true);

    try {
      await logIn(email, password);
      setEmail("");
      setPassword("");
      setError(null);
      props.setPopup(false);
      props.setSigninPopup(false);
      props.setLoad(false);
    } catch (e) {
      setError(mapAuthCodeToMessage(e.code));
      props.setLoad(false);
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
            autoComplete="current-email"
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={handlePasswordChange}
            autoComplete="current-password"
            required
          />
        </Form.Group>
        {error && <p className="error">{error}</p>}
        <Button type="submit" className="signin__submit" disabled={props.load}>
          Signin
        </Button>
      </Form>
      <p>
        Don't have an account yet?
        <Button
          variant="link"
          onClick={toggleSignupPopup}
          className="signin__signup"
          disabled={props.load}
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
};

export default Signin;
