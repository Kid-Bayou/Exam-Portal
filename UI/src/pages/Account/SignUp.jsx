import {Link} from "react-router-dom"

function SignUp() {
  const user_regex = /^[A-z][A-z0-9-_]{3,23}$/;
  const emai = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  return (
    <>
    <div className="sign-in-up">
        <h1 className="sign-in-up-header">Sign Up</h1>
        <form className="sign-in-up-form">
          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Name:</p>
            <input className="sign-in-up-input" type="text" name="title" />
          </label>
          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Email:</p>
            <input className="sign-in-up-input" name="description" />
          </label>
          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Password:</p>
            <input className="sign-in-up-input" name="description" />
          </label>
          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Confirm Password:</p>
            <input className="sign-in-up-input" name="description" />
          </label>
          <button className="button sign-in-up-btn" type="submit">
            Sign Up
          </button>
        </form>
        <p className="sign-in-up-alternative">Already Have An Account? <Link to="/login" className="sign-in-up-other">Sign In</Link></p>
    </div>
      
    </>
  );
}

export default SignUp;
