import React, { useState } from 'react';
import Header from './Header';
import '../css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../appContext';

export default function Login() {
  const navigate = useNavigate();
  const {setToken} = useAppContext()
  const [error, setError] = useState('');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

  async function submitLogin(e) {
    e.preventDefault();
    try {
      console.log(`${BACKEND_URL}/api/authentication/login`);
      const response = await axios.post(`${BACKEND_URL}/api/authentication/login`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });
      const jwtToken = response.data.token; 
      if(jwtToken){
        setToken(jwtToken)
        navigate("/");
        setError('')
      }
    } catch (error) {
      const {response} = error
      if(response.data.msg){
        setError(response.data.msg)
      }
      console.error('Login failed:', error);
    }
  }

  return (
    <>
      <Header />
      <div className='login-container'>
        <form className='login-form' onSubmit={submitLogin}>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' name='email' required />

            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' name='password' required />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='login-btn login-btns' type='submit'>Login</button>
        </form>
        <div className='register-prompt'>
          <p>Don't have an account?</p>
          <button className='login-btns' onClick={() => window.location.href = '/register'}>Register</button>
        </div>
      </div>
    </>
  );
}
