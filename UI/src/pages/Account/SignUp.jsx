function SignUp() {
    return (
        <>
                        <h1 className="form-header">Sign Up</h1>
      <form className="form">
        <label className="form-box">
          <p className="form-label"> Name:</p>
          <input
          className="form-input"
            type="text"
            name="title"
          />
        </label>
        <br />
        <br />
        <label className="form-box">
          <p className="form-label"> Email:</p>
          <input
          className="form-input"
            name="description"
          />
        </label>
        <br />
        <br />
        <label className="form-box">
          <p className="form-label"> Password:</p>
          <input
          className="form-input"
            name="description"
          />
        </label>
        <br />
        <br />
        <label className="form-box">
          <p className="form-label"> Confirm Password:</p>
          <input
          className="form-input"
            name="description"
          />
        </label>
        <br />
        <br />
        <button className="button" type="submit">
          Login
        </button>
      </form>
        </>
    )
}

export default SignUp