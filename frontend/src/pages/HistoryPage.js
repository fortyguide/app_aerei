import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ticketService from '../services/ticketService';
import './HistoryPage.css';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({ operation: '', arrivalTime: '', destination: '' });
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
    } catch (error) {
      console.error('Errore durante il recupero dello storico:', error);
    }
  };

  const handleSort = () => {
    const sortedHistory = [...history].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setHistory(sortedHistory);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    const latestTickets = history.reduce((acc, item) => {
      acc[item.ticketId] = item;
      return acc;
    }, {});

    const filteredHistory = Object.values(latestTickets).filter(item => {
      const matchesOperation = !filters.operation || item.operation === filters.operation;
      const matchesArrivalTime = !filters.arrivalTime || new Date(item.timestamp) >= new Date(filters.arrivalTime);
      const matchesDestination = !filters.destination || item.destination.toLowerCase().includes(filters.destination.toLowerCase());
      return matchesOperation && matchesArrivalTime && matchesDestination;
    });

    return filteredHistory;
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleCancel = async (ticketId) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token=')).split('=')[1];
    try {
      await ticketService.cancelTicket(ticketId, token);
      setHistory(prevHistory => prevHistory.map(item => 
        item.ticketId === ticketId ? { ...item, operation: 'cancellazione', timestamp: new Date().toISOString() } : item
      ));
    } catch (error) {
      console.error('Errore durante la cancellazione del biglietto:', error);
    }
  };

  const handleCheckIn = async (ticketId) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token=')).split('=')[1];
    try {
      await ticketService.checkInTicket(ticketId, token);
      setHistory(prevHistory => prevHistory.map(item => 
        item.ticketId === ticketId ? { ...item, operation: 'check-in', timestamp: new Date().toISOString() } : item
      ));
    } catch (error) {
      console.error('Errore durante il check-in del biglietto:', error);
    }
  };

  const filteredHistory = applyFilters();

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
          {filteredHistory.map(item => (
            <tr key={item.ticketId}>
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
