import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import axios from 'axios';
import Alert from '../Alert/Alert';

const Login = ({ onLogin }) => {
  const [logUserName, setUserName] = useState('');
  const [logPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [cls, setCls] = useState('none');

  useEffect(() => {
    // Check if there are remembered credentials in localStorage
    const storedUserName = localStorage.getItem('rememberedUserName');
    const storedPassword = localStorage.getItem('rememberedPassword');

    if (storedUserName && storedPassword) {
      setUserName(storedUserName);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);
  axios.defaults.withCredentials =true
  const handleSumbit = async (e) => {
    e.preventDefault();

    // If rememberMe is enabled, save credentials in localStorage
    if (rememberMe) {
      localStorage.setItem('rememberedUserName', logUserName);
      localStorage.setItem('rememberedPassword', logPassword);
    } else {
      localStorage.removeItem('rememberedUserName');
      localStorage.removeItem('rememberedPassword');
    }

    try {
      // Attempt to authenticate the user with the server
      const result = await axios.post('http://localhost:9000/auth/login', {
        username: logUserName,
        email: logUserName,
        password: logPassword,
      });

      // Check the login status returned from the server
      if (result.data.loginStatus) {
        // Set isAuthenticated state in the parent component (App)
        onLogin();
        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        // If login fails, show an error message
        setCls('flex');
        setError(result.data.Error);
      }
    } catch (err) {
      // Handle any errors that occurred during the login process
      console.error(err);
    }
  };

  useEffect(() => {
    // Hide the error message after a certain time
    if (error !== '') {
      const timeoutId = setTimeout(() => {
        setCls('none');
      }, 4000);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <div className="log text-center">
       <form
        action=""
        onSubmit={handleSumbit}
        className="form-signin gap-2 shadow-lg p-3 mb-5 bg-body rounded fw-semibold"
      >
        <img className="mb-4" src={logo} alt="" width="120" height="120" />
        <h1 className="h3 mb-3 font-weight-normal texts">CRM System</h1>
        <Alert error={error && error} cls={{ display: cls }} />
        <label htmlFor="exampleInputEmail1" className="form-label text-start w-100">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email address"
          required=""
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          autoFocus=""
        />
        <label htmlFor="exampleInputPassword1" className="form-label text-start w-100">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required=""
        />
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>
        <button className="btn w-100 btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted"> CRM-SYSTEM © 2017-2018</p>
      </form>
    </div>
  );
};

export default Login;
