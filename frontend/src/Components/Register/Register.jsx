import React, { useEffect, useState } from 'react'
import './Register.css'
import '../../App.css'
import bg from '../../Assets/bg.jpg'
import {Link, useNavigate} from 'react-router-dom'
import {FaUserShield, FaLock, FaEnvelope} from 'react-icons/fa'
import { FaImagePortrait } from "react-icons/fa6";
import {RiLogoutBoxLine} from 'react-icons/ri'
import logo from '../../Assets/logo.png'
import Axios from 'axios'

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);

    Axios.post('http://localhost:9000/register', formData)
      .then((response) => {
        navigate('/')
        console.log(response.data.message);

        // Handle success, e.g., show a success message or redirect to another page
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        // Handle error, e.g., show an error message to the user
      });
  };

  return (
    <div className='registerPage flex'>
      <div className='container flex'>
        <div className='videoDiv'>
          <img src={bg} className='img1' alt='bg'></img>
          <div className='textDiv'>
            <h2 className='title'>Create and Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature</p>
          </div>
          <div className="footerDiv flex">
            <span className='text'>Have an account?</span>
            <Link to={'/'}>
              <button className='btn'>Sign in</button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="logo" />
            <h3>New account</h3>
          </div>
          <form action="" className='form grid'>
            {/* <p className={statusHolder}>
              {emailError}
            </p> */}
          <div className="inputDiv">
              <label htmlFor="username">Username*</label>
              <div className="input flex">
                <FaUserShield className="icon"/>
                <input type="text" required id='username' placeholder='Enter username' onChange={(e) => {
                  setUserName(e.target.value)
                }} />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="email">Email*</label>
              <div className="input flex">
                <FaEnvelope className="icon"/>
                <input type="email" required id='email' placeholder='Enter email' onChange={(e) => {
                  setEmail(e.target.value)
                }} />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password*</label>
              <div className="input flex">
                <FaLock className="icon"/>
                <input type="password" required id='password' placeholder='Enter password' onChange={(e) => {
                  setPassword(e.target.value)
                }}/>
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Image*</label>
              <div className="input flex">
                <FaImagePortrait className="icon"/>
                <input type="file" onChange={handleImageChange} />
              </div>
            </div>
            <button type='submit' className='btn flex' onClick={handleRegister}>
              <span>Register</span>
              <RiLogoutBoxLine className='icon'/>
            </button>
            <span className='forgotPassword'>
              Forgot your password? <a href="">Click here</a>
            </span>

          </form>

        </div>
       
      </div>
    </div>
  )
}

export default Register