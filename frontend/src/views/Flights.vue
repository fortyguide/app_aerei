<template>
  <div>
    <h1>Flights</h1>
    <form @submit.prevent="searchFlights">
      <div>
        <label for="flightNumber">Numero Volo:</label>
        <input type="text" v-model="searchParams.flightNumber" />
      </div>
      <div>
        <label for="destination">Destinazione:</label>
        <input type="text" v-model="searchParams.destination" />
      </div>
      <div>
        <label for="departureTime">Ora di Partenza:</label>
        <input type="datetime-local" v-model="searchParams.departureTime" />
      </div>
      <button type="submit">Cerca</button>
    </form>
    <div v-if="flights.length">
      <table>
        <thead>
          <tr>
            <th>Numero Volo</th>
            <th>Ora di Partenza</th>
            <th>Ora di Arrivo</th>
            <th>Destinazione</th>
            <th>Posti Disponibili</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="flight in flights" :key="flight.id">
            <td>{{ flight.flightNumber }}</td>
            <td>{{ flight.departureTime }}</td>
            <td>{{ flight.arrivalTime }}</td>
            <td>{{ flight.destination }}</td>
            <td>{{ flight.availableSeats }}</td>
            <td>
              <button @click="purchaseTicket(flight.flightNumber)">Acquista</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Nessun volo disponibile.</p>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'Flights',
  data() {
    return {
      flights: [],
      searchParams: {
        flightNumber: '',
        destination: '',
        departureTime: '',
      },
    };
  },
  async created() {
    this.fetchFlights();
  },
  methods: {
    async fetchFlights() {
      try {
        const response = await axios.get('/flight/flights');
        this.flights = response.data;
      } catch (error) {
        console.error('Errore nel recupero dei voli:', error);
      }
    },
    async searchFlights() {
      try {
        const response = await axios.post('/flight/search', this.searchParams);
        this.flights = response.data;
      } catch (error) {
        console.error('Errore nella ricerca dei voli:', error);
      }
    },
    async purchaseTicket(flightNumber) {
      try {
        const response = await axios.post('/ticket/purchase', { flightNumber });
        alert(`Biglietto acquistato con successo: ${response.data.ticketId}`);
        this.fetchFlights();
      } catch (error) {
        console.error('Errore durante l\'acquisto del biglietto:', error);
        alert('Errore durante l\'acquisto del biglietto.');
      }
    },
  },
};
</script>