import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const userRef = useRef();
  const errRef = useRef();

  const user_regex = /^[A-z][A-z0-9-_]{3,23}$/;
  const email_regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
}, [])

  useEffect(() => {
    const result = user_regex.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = email_regex.test(email);
    console.log(result);
    console.log(user);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = pwd_regex.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
    [user, pwd, matchPwd];
  });

  return (
    <>
      <div className="sign-in-up">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>

        <h1 className="sign-in-up-header">Sign Up</h1>
        <form className="sign-in-up-form">
          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Name:</p>
            <input
              type="text"
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="sign-in-up-input"
            />
          </label>

          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Email:</p>
            <input 
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            className="sign-in-up-input" 
            />
          </label>

          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Password:</p>
            <input 
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            value={pwd}
            className="sign-in-up-input" 
            />
          </label>

          <label className="sign-in-up-box">
            <p className="sign-in-up-label"> Confirm Password:</p>
            <input 
            type="password"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            value={matchPwd}
            className="sign-in-up-input" 
             />
          </label>

          <button disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false} className="button sign-in-up-btn" type="submit">
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
