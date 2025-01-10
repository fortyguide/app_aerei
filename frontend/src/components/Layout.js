import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children, isAuthenticated, onLogout }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>Applicazione Aerei</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/flights">Voli</Link></li>
            <li><Link to="/tickets">Biglietti</Link></li>
            <li><Link to="/history">Storico</Link></li>
            {!isAuthenticated ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Registrati</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/profile">Profilo</Link></li>
              </>
            )}
          </ul>
        </nav>
        {isAuthenticated && (
          <button className="logout-btn show" onClick={onLogout}>Logout</button>
        )}
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2023 Applicazione Aerei. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default Layout;