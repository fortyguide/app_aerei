import React, { useState, useEffect } from 'react';
import flightService from '../services/flightService';
import './FlightsPage.css';

function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await flightService.getFlights(filters, page, limit);
        setFlights(data.flights);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Errore nel recupero dei voli:', error);
      }
    };

    fetchFlights();
  }, [filters, page, limit]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === 'availableSeats' ? Math.max(0, value) : value,
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  return (
    <div className="flights-container">
      <h1>Cerca il tuo volo:</h1>
      <div className="filters">
        <label>
          Destinazione:
          <input type="text" name="destination" onChange={handleFilterChange} />
        </label>
        <label>
          Data di partenza:
          <input type="date" name="departureTime" onChange={handleFilterChange} />
        </label>
        <label>
          Posti richiesti:
          <input type="number" name="availableSeats" min="0" onChange={handleFilterChange} />
        </label>
        <button onClick={() => setPage(1)}>Cerca</button>
      </div>
      <ul className="flights-list">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <li key={flight.id}>
              Volo {flight.flightNumber} per {flight.destination} in arrivo il {formatDate(flight.arrivalTime)}
            </li>
          ))
        ) : (
          <p>Nessun volo disponibile</p>
        )}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Precedente
        </button>
        <span>Pagina {page} di {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Successiva
        </button>
      </div>
    </div>
  );
}

export default FlightsPage;