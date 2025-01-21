import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HistoryPage.css';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({ operation: '', arrivalTime: '', destination: '' });
  const [filteredHistory, setFilteredHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthCookie = () => {
      const authCookie = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
      return authCookie ? authCookie.split('=')[1] : null;
    };

    const token = checkAuthCookie();
    if (!token) {
      navigate('/login');
    } else {
      fetchHistory(token);
    }
  }, [navigate]);

  const fetchHistory = async (token) => {
    try {
      const response = await axios.get('https://localhost:3000/api/history/read', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setHistory(response.data.history);
      setFilteredHistory(response.data.history);  // inizializza la history filtrata con tutti gli elementi
    } catch (error) {
      console.error('Errore durante il recupero dello storico:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    let filtered = history;

    if (filters.operation) {
      filtered = filtered.filter(item => item.operation === filters.operation);
    }
    if (filters.arrivalTime) {
      filtered = filtered.filter(item => new Date(item.timestamp) >= new Date(filters.arrivalTime));
    }
    if (filters.destination) {
      filtered = filtered.filter(item => item.destination.toLowerCase().includes(filters.destination.toLowerCase()));
    }

    setFilteredHistory(filtered);
  };

  const handleSort = () => {
    const sortedHistory = [...filteredHistory].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setFilteredHistory(sortedHistory);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleCancel = async (ticketId) => {
    try {
      await axios.post(`https://localhost:3000/api/ticket/cancel/${ticketId}`, {}, {
        withCredentials: true,
      });
      alert('Biglietto cancellato con successo!');
      const token = document.cookie.split('; ').find(row => row.startsWith('auth_token=')).split('=')[1];
      fetchHistory(token); // Refresh della tabella
    } catch (error) {
      console.error('Errore durante la cancellazione del biglietto:', error);
      alert('Errore durante la cancellazione del biglietto');
    }
  };

  const handleCheckIn = async (ticketId) => {
    try {
      await axios.post(`https://localhost:3000/api/ticket/checkin/${ticketId}`, {}, {
        withCredentials: true,
      });
      alert('Check-in effettuato con successo!');
      const token = document.cookie.split('; ').find(row => row.startsWith('auth_token=')).split('=')[1];
      fetchHistory(token); // Refresh della tabella
    } catch (error) {
      console.error('Errore durante il check-in del biglietto:', error);
      alert('Errore durante il check-in del biglietto');
    }
  };

  return (
    <div className="history-page">
      <h1>Storico Operazioni</h1>
      <form className="filters" onSubmit={handleSearch}>
        <label>
          Tipo di Operazione:
          <select name="operation" value={filters.operation} onChange={handleFilterChange}>
            <option value="">Tutti</option>
            <option value="acquisto">Acquisto</option>
            <option value="cancellazione">Cancellazione</option>
            <option value="check-in">Check-in</option>
          </select>
        </label>
        <label>
          Data della transazione:
          <input type="datetime-local" name="arrivalTime" value={filters.arrivalTime} onChange={handleFilterChange} />
        </label>
        <label>
          Destinazione:
          <input type="text" name="destination" value={filters.destination} onChange={handleFilterChange} />
        </label>
        <button type="submit">Cerca</button>
      </form>
      <table className="history-table">
        <thead>
          <tr>
            <th onClick={handleSort}>Ora Transazione</th>
            <th>Operazione</th>
            <th>Numero Volo</th>
            <th>Destinazione</th>
            <th>Orario di Partenza</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((item, index) => (
            <tr key={`${item.ticketId}-${index}`}>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
              <td>{item.operation}</td>
              <td>{item.flightNumber}</td>
              <td>{item.destination}</td>
              <td>{new Date(item.departureTime).toLocaleString()}</td>
              <td>
                {item.operation === 'acquisto' && (
                  <>
                    <button onClick={() => handleCancel(item.ticketId)}>Cancella biglietto</button>
                    <button onClick={() => handleCheckIn(item.ticketId)}>Effettua il check-in</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;