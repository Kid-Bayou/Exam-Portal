import {Link} from "react-router-dom"

function Login() {
  return (
    <>
    <div className="sign-in-up">
        <h1 className="sign-in-up-header">Login</h1>
        <form className="sign-in-up-form">
          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Email:</p>
            <input className="sign-in-up-input" name="description" />
          </label>
          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Password:</p>
            <input className="sign-in-up-input" name="description" />
          </label>
          <button className="button sign-in-up-btn" type="submit">
            Login
          </button>
        </form>
        <p className="sign-in-up-alternative">Don't Have An Account? <Link to="/" className="sign-in-up-other">Sign Up</Link></p>
    </div>
      
    </>
  );
}

export default Login;
