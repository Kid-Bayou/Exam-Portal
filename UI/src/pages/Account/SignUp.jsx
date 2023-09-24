import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { eSignup } from "../../service/APIAuthService";

function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!userData.firstName) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!userData.lastName) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!userData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!userData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!userData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      valid = false;
    } else if (userData.confirmPassword !== userData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await eSignup(userData);
      console.log("Signup successful:", response);
      navigate("/")
    } catch (error) {
      console.error("Error signing up:", error);
      setErrors("An error occurred during signup. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="sign-in-up">


        <h1 className="sign-in-up-header">Sign Up</h1>
        <form className="sign-in-up-form" onSubmit={handleSignup}>
          <label className="sign-in-up-box">
            <p className="sign-in-up-label">First Name:</p>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={userData.firstName}
              required
              className="sign-in-up-input"
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </label>

          <label className="sign-in-up-box">
            <p className="sign-in-up-label">Last Name:</p>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={userData.lastName}
              required
              className="sign-in-up-input"
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </label>

          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Email:</p>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={userData.email}
              required
              className="sign-in-up-input"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Password:</p>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              value={userData.password}
              className="sign-in-up-input"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </label>

          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Confirm Password:</p>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              required
              value={userData.confirmPassword}
              className="sign-in-up-input"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </label>

          <button
            className="button sign-in-up-btn"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="sign-in-up-alternative">
          Already Have An Account?{" "}
          <Link to="/login" className="sign-in-up-other">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
