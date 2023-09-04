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

    const userRole =
      myDecodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    console.log("User Role:", userRole);

    const userName =
      myDecodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ];
    console.log("User Name:", userName);

    if (userRole == "ExamTaker") {
      const encodedUserName = encodeURIComponent(userName);
      navigate(`/admindashboard/${encodedUserName}`);
    } else userRole == "Administrator";
    navigate(`/admindashboard/${userName}`);
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
