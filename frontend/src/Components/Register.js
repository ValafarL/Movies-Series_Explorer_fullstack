import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    verifyPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.verifyPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/api/authentication/register`,{
          name: formData.name,
          email: formData.email,
          password: formData.password
      })
      navigate('/login')
      setError('');
    } catch (error) {
      const {response} = error
      if(response.data.msg){
        setError(response.data.msg)
      }
      console.log(error)
    }
  };

  return (
    <div className='login-container'>
      <h2>Register</h2>
      <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="verifyPassword">Verify Password:</label>
          <input
            type="password"
            id="verifyPassword"
            name="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleChange}
            required
          />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className='login-btns' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
