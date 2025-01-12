import React, { useState } from 'react';
import authService from '../services/authService';
import './LoginPage.css'; // Riutilizziamo lo stesso CSS della pagina di login

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateEmail(email)) {
      setMessage('Inserisci un indirizzo email valido.');
      return;
    }

    if (password.length < 6) {
      setMessage('La password deve contenere almeno 6 caratteri.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Le password non corrispondono.');
      return;
    }

    if (!name.trim()) {
      setMessage('Il nome è obbligatorio.');
      return;
    }

    if (!surname.trim()) {
      setMessage('Il cognome è obbligatorio.');
      return;
    }

    try {
      await authService.register(email, password, name, surname);
      setMessage('Registrazione avvenuta con successo. Ora puoi effettuare il login.');
    } catch (error) {
      const errorMsg = error.response?.data?.errors?.[0]?.msg || 'Errore durante la registrazione. Riprova più tardi.';
      setMessage(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <h1>Registrazione</h1>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Conferma Password:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="surname">Cognome:</label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrati</button>
        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;