import React, { useState, useEffect } from 'react';
import flightService from '../services/flightService';

function FlightsPage() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await flightService.getFlights();
        if (Array.isArray(data)) {
          setFlights(data); // Imposta l'array dei voli
        } else {
          console.error('Expected an array of flights, but got:', data);
        }
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <h1>Flights Page</h1>
      <ul>
        {Array.isArray(flights) && flights.length > 0 ? (
          flights.map((flight) => (
            <li key={flight.id}>
              Volo {flight.flightNumber} per {flight.destination} in arrivo il {flight.arrivalTime}
            </li>
          ))
        ) : (
          <p>Nessun volo disponibile</p>
        )}
      </ul>
    </div>
  );
}

export default FlightsPage;
