import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { login } from "../../service/APIAuthService";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  var token = "";

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login(formData);
      console.log("Signup successful:", response);
      token = response;
      handleLogin(event);
    } catch (error) {
      console.error("Error signing up:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = (event) => {
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
  
    console.log("tis the season of the token:", myDecodedToken);
  
    if (myDecodedToken && myDecodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
      const userRole = myDecodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log('User Role:', userRole);
    } else {
      console.error('Role claim not found in the token.');
    }

    if (myDecodedToken && myDecodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']) {
    const userName = myDecodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    console.log('User Name:', userName);
  } else {
    console.error('Name claim not found in the token.');
  }
  };

  return (
    <>
      <div className="sign-in-up">
        <h1 className="sign-in-up-header">Login</h1>
        <form className="sign-in-up-form" onSubmit={handleSubmit}>
          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Email:</p>
            <input
              className="sign-in-up-input"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Password:</p>
            <input
              className="sign-in-up-input"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <button className="button sign-in-up-btn" type="submit">
            Login
          </button>
          {error && <p>{error}</p>}
        </form>
        <p className="sign-in-up-alternative">
          Don't Have An Account?{" "}
          <Link to="/signup" className="sign-in-up-other">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
