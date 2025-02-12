import React, { useState } from 'react';
import axios from 'axios';
import './AddFlightPage.css';

const AddFlightPage = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [destination, setDestination] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthTokenFromCookies();
      const response = await axios.post('https://localhost:3000/api/flights', {
        flightNumber,
        departureTime,
        arrivalTime,
        destination,
        availableSeats,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Errore durante la creazione del volo. Riprova più tardi.');
    }
  };

  const getAuthTokenFromCookies = () => {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
    if (authCookie) {
      return authCookie.split('=')[1];
    }
    return null;
  };

  return (
    <div className="add-flight-page">
      <h1>Aggiungi un nuovo volo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="flightNumber">Numero Volo:</label>
          <input
            id="flightNumber"
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="departureTime">Orario di Partenza:</label>
          <input
            id="departureTime"
            type="datetime-local"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="arrivalTime">Orario di Arrivo:</label>
          <input
            id="arrivalTime"
            type="datetime-local"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="destination">Destinazione:</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="availableSeats">Posti Disponibili:</label>
          <input
            id="availableSeats"
            type="number"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            required
          />
        </div>
        <button type="submit">Aggiungi Volo</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddFlightPage;