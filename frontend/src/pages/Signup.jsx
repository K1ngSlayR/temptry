import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    gamertag: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, gamertag, country } = signupInfo;
    if (!name || !email || !password || !gamertag || !country) {
      return handleError("All fields are required!");
    }
    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <h2 className="text-center mt-5">Signup</h2>
      <div className="mt-5 w-25 mx-auto">
        <Form onSubmit={handleSignup}>
          <FloatingLabel controlId="floatingName" label="Name">
            <Form.Control
              name="name"
              type="text"
              placeholder="Name"
              className="mb-3"
              value={signupInfo.name}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingGamertag" label="Gamertag">
            <Form.Control
              name="gamertag"
              type="text"
              placeholder="Gamertag"
              className="mb-3"
              value={signupInfo.gamertag}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingCountry" label="Country">
            <Form.Control
              name="country"
              type="text"
              placeholder="Country"
              className="mb-3"
              value={signupInfo.country}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingEmail" label="Email address">
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
              className="mb-3"
              value={signupInfo.email}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              className="mb-3"
              value={signupInfo.password}
              onChange={handleChange}
            />
          </FloatingLabel>

          <div className="d-flex flex-column justify-content-center gap-3">
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
            <span className="text-center">
              Already have an account?
              <Link to="/login">Log In</Link>
            </span>
          </div>
        </Form>

        <ToastContainer />
      </div>
    </>
  );
}

export default Signup;
