import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberMeEmail');
    const savedPassword = localStorage.getItem('rememberMePassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage('Inserisci un indirizzo email valido.');
      return;
    }
    if (password.trim() === '') {
      setMessage('La password non può essere vuota.');
      return;
    }
    try {
      const response = await authService.login(email, password);
      onLogin(response.token);
      if (rememberMe) {
        localStorage.setItem('rememberMeEmail', email);
        localStorage.setItem('rememberMePassword', password);
      } else {
        localStorage.removeItem('rememberMeEmail');
        localStorage.removeItem('rememberMePassword');
      }
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Email o password non corretti.');
      } else {
        setMessage('Errore durante il login. Riprova più tardi.');
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Ricordami
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default LoginPage;