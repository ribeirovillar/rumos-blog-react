import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './RegisterPage.css';

function useRegister() {
  const authService = new AuthService();

  return async (userRegistrationDTO) => {
    try {
      await authService.register(userRegistrationDTO);
      alert('Registration successful');
    } catch (error) {
      throw error;
    }
  };
}

function handleError(error) {
  if (error.response && error.response.data) {
    return error.response.data.message;
  } else {
    return 'Error registering account';
  }
}

function Input({ label, type, value, onChange }) {
  return (
    <label>
      {label}:
      <input type={type} value={value} onChange={onChange} required />
    </label>
  );
}

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const register = useRegister();

  const handleRegister = async (event) => {
    event.preventDefault();

    const userRegistrationDTO = {
      email,
      password,
      firstName,
      lastName,
      birthDate
    };

    try {
      await register(userRegistrationDTO);
    } catch (error) {
      setError(handleError(error));
    }
  };

  return (
    <div className="registerPageContainer">
      <form onSubmit={handleRegister} className="registerForm">
        <h1>Register Page</h1>
        {error && <p className="error">{error}</p>}
        <Input label="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <Input label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <Input label="Birth Date" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <button type="submit">Register</button>
        <Link to="/login" className="loginLink">Already have an account? Log in</Link>
      </form>
    </div>
  );
}

export default RegisterPage;