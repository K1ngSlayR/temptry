import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
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
      <h2 className="text-center mt-5">Log In</h2>
      <div className="mt-5 w-25 mx-auto">
        <Form onSubmit={handleLogin}>
          <FloatingLabel controlId="floatingInput" label="Email address">
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
              className="mb-3"
              value={loginInfo.email}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              className="mb-3"
              value={loginInfo.password}
              onChange={handleChange}
            />
          </FloatingLabel>

          <div className="d-flex flex-column justify-content-center gap-3">
            <button type="submit" className="btn btn-success">
              Log In
            </button>
            <span className="text-center">
              Don&apos;t have an account?
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
