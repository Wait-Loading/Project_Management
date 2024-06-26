import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Your additional CSS file

function Login({ onLogin }) {
  let [User_id, Set_User_id] = useState('');
  let [password, set_Password] = useState('');
  const loginValues = { User_id, password };
  const navigate = useNavigate();

  // Provide a default function for onLogin if it's not provided
  onLogin = onLogin || function() { console.log('onLogin not provided'); };

  const handleLogin = (event) => {
    event.preventDefault();
    axios.get('http://localhost:9000/getUser', { params: loginValues })
      .then((res) => {
        if (res && res.data) {
          alert('Login Successful');
          onLogin();
          localStorage.clear()
          localStorage.setItem('loggedInUser', res.data.User_id)
          localStorage.setItem('loggedobj', res.data)
          navigate('/Home');
        } else {
          alert('Wrong Credentials');
        }
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err);
        alert('Error in login');
      });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="text-center">
        <h2>Login Page</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              value={User_id}
              onChange={(e) => Set_User_id(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => set_Password(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/signup')}>Go to Signup</button>
      </div>
    </div>
  );
}

export default Login;