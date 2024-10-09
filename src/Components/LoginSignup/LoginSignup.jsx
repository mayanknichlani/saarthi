// src/LoginSignup.js
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="loginSignup">
      <div className="login-signup-container p-3">
      <div className="toggle-buttons">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
      </div>
      <div className={`form-card ${isLogin ? "slide-in-left" : "slide-in-right"} p-3`}>
        {isLogin ? <Login /> : <Signup setIsLogin={setIsLogin} />}
      </div>
    </div>
    </div>
  );
};

export default LoginSignup;
