import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';

const Login = () => {

  const [signState, setSignSet] = useState("Sign In"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (e) => {
    e.preventDefault();
    if(signState === "Sign In"){
      await login(email, password);
    } else {
      await signup(name, email, password)
    }
  }

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="Netflix Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Your name'
            />
          )}
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setSignSet("Sign In")}>Sign In Now</span>
            </p>
          ) : (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignSet("Sign Up")}>Sign Up Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
