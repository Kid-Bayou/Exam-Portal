import {Link} from "react-router-dom"

function SignUp() {
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
