import { Link, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import './Layout.css';

const Layout = ({ children, isAuthenticated, isAdmin, onLogout }) => {
  const location = useLocation();

  const handleLogout = async () => {
    await authService.logout();
    onLogout();
  };

  return (
    <div className="layout">
      <header className="header">
        <h1>Applicazione Aerei</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {!isAuthenticated ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Registrati</Link></li>
              </>
            ) : (
              <>
                {!isAdmin && (
                  <>
                    <li><Link to="/flights">Voli</Link></li>
                    <li><Link to="/profile">Profilo</Link></li>
                    <li><Link to="/history">Gestione biglietti acquistati</Link></li>
                  </>
                )}
                {isAdmin && (
                  <>
                    <li><Link to="/addFlight">Creazione volo</Link></li>
                    <li><Link to="/managementFlight">Gestione voli</Link></li>
                  </>
                )}
              </>
            )}
          </ul>
        </nav>
        {isAuthenticated && location.pathname === '/' && (
          <button className="logout-btn show" onClick={handleLogout}>Logout</button>
        )}
      </header>
      <main>{children}</main>
      <footer className="footer">
        <p>&copy; 2025 Applicazione Aerei. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default Layout;