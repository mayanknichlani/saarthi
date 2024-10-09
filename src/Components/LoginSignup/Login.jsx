import React, { useState } from 'react';
import './LoginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert(res.data.msg)
      setSuccess(res.data.msg);
      setError('');
      navigate("/dashboard")
    } catch (err) {
      alert(err.response.data.msg)
      setError(err.response.data.msg);
      setSuccess('');
    }
  };

  return (
    <div className="form-content">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-msg" style={{color: "red"}}>{error}</p>}
        {success && <p className="success-msg" style={{color: "green"}}>{success}</p>}
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
