import React, { useState, useEffect } from 'react';
import flightAdminService from '../services/flightAdminService';
import './FlightsPage.css';

const AdminFlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFlights();
  }, [page]);

  const fetchFlights = async () => {
    setError('');
    try {
      const filters = {};
      if (destination) filters.destination = destination;
      if (departureTime) filters.departureTime = departureTime;
      if (availableSeats) filters.availableSeats = availableSeats;
      const response = await flightAdminService.getFlights(filters, page);
      setFlights(response.flights);
      setTotalPages(response.totalPages);
    } catch (error) {
      setError('Non ci sono voli che rispettano i filtri di ricerca! Riprovare.');
      setFlights([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchFlights();
  };

  const handleDelete = async (flightId) => {
    try {
      await flightAdminService.deleteFlight(flightId);
      alert('Volo cancellato con successo!');
      fetchFlights();
    } catch (error) {
      setError('Errore durante la cancellazione del volo. Riprova più tardi.');
    }
  };

  const handleEdit = (flightId) => {
    // Implementa la logica per la modifica del volo
    // Potresti reindirizzare a una pagina di modifica con il flightId
  };

  return (
    <div className="flights-page">
      <h1>Gestione Voli</h1>
      <form className="filters" onSubmit={handleSearch}>
        <div>
          <label htmlFor="destination">Destinazione:</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="departureTime">Data di partenza:</label>
          <input
            id="departureTime"
            type="datetime-local"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="availableSeats">Numero minimo di posti richiesti:</label>
          <input
            id="availableSeats"
            type="number"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
          />
        </div>
        <button type="submit">Cerca</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <table className="flights-table">
        <thead>
          <tr>
            <th>Numero Volo</th>
            <th>Destinazione</th>
            <th>Data di Partenza</th>
            <th>Data di Arrivo</th>
            <th>Posti Disponibili</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.destination}</td>
              <td>{new Date(flight.departureTime).toLocaleString()}</td>
              <td>{new Date(flight.arrivalTime).toLocaleString()}</td>
              <td>{flight.availableSeats}</td>
              <td className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(flight.id)}>Modifica</button>
                <button className="delete-btn" onClick={() => handleDelete(flight.id)}>Cancella</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Precedente
        </button>
        <span>Pagina {page} di {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Successivo
        </button>
      </div>
    </div>
  );
};

export default AdminFlightsPage;