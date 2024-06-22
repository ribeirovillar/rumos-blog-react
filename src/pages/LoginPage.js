import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './LoginPage.css';

function useAuth() {
  const navigate = useNavigate();
  const authService = new AuthService();

  return async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('roles', getRolesFromToken(token));
      navigate('/landing');
    } catch (error) {
      throw error;
    }
  };
}

function getRolesFromToken(token) {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const { roles } = JSON.parse(payload);
    return roles;
  } catch (error) {
    console.error('Erro ao extrair roles do token:', error);
    return null;
  }
}

function handleError(error) {
  if (error.response && error.response.data) {
    return error.response.data.message;
  } else {
    return 'Ocorreu um erro ao tentar fazer login';
  }
}

function Input({ label, type, value, onChange }) {
  return (
    <label>
      {label}:
      <input type={type} value={value} onChange={onChange} />
    </label>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const authenticate = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await authenticate(email, password);
    } catch (error) {
      setError(handleError(error));
    }
  };

  return (
    <div className="loginPageContainer">
      <form onSubmit={handleLogin} className="loginForm">
        <h1>Login Page</h1>
        {error && <p className="error">{error}</p>}
        <Input label="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <Link to="/register" className="registerLink">Create Account</Link>
      </form>
    </div>
  );
}

export default LoginPage;