import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FlightsPage from './pages/FlightsPage';
import TicketsPage from './pages/TicketsPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    setIsAuthenticated(getCookie('auth_token') !== undefined);
  }, []);

  const handleLogin = (token) => {
    document.cookie = `auth_token=${token}; path=/; secure; samesite=strict`;
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    document.cookie = 'auth_token=; Max-Age=0; path=/; secure; samesite=strict';
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<h2>Pagina non trovata</h2>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;