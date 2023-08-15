import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"
import {login} from "../../service/APIAuthService"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await login(formData);
      if (response.success) {
        console.log("Login successful");
        setIsLogged(true);
        setError("");
        navigate("/");
      } else {
        console.log("Login failed:", response.errorMessage);
        setIsLogged(false);
        setError(response.errorMessage);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
        <p className="sign-in-up-alternative">Don't Have An Account? <Link to="/signup" className="sign-in-up-other">Sign Up</Link></p>
    </div>
      
    </>
  );
}

export default Login;
