<template>
  <div>
    <h1>Tickets</h1>
    <div v-if="tickets.length">
      <table>
        <thead>
          <tr>
            <th>ID Biglietto</th>
            <th>Numero Volo</th>
            <th>Destinazione</th>
            <th>Data</th>
            <th>Stato</th>
            <th>Check-in Effettuato</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td>{{ ticket.id }}</td>
            <td>{{ ticket.flightNumber }}</td>
            <td>{{ ticket.destination }}</td>
            <td>{{ ticket.date }}</td>
            <td>{{ ticket.status }}</td>
            <td>{{ ticket.checkinDone ? 'Sì' : 'No' }}</td>
            <td>
              <button @click="checkinTicket(ticket.id)" :disabled="ticket.checkinDone">Check-in</button>
              <button @click="cancelTicket(ticket.id)" :disabled="ticket.status === 'canceled'">Cancella</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Nessun biglietto disponibile.</p>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'Tickets',
  data() {
    return {
      tickets: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('/ticket/monitoring');
      this.tickets = response.data;
    } catch (error) {
      console.error('Errore nel recupero dei biglietti:', error);
    }
  },
  methods: {
    async checkinTicket(ticketId) {
      try {
        await axios.post(`/ticket/checkin/${ticketId}`);
        alert('Check-in effettuato con successo.');
        this.tickets = this.tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, checkinDone: true } : ticket
        );
      } catch (error) {
        console.error('Errore durante il check-in del biglietto:', error);
        alert('Errore durante il check-in del biglietto.');
      }
    },
    async cancelTicket(ticketId) {
      try {
        await axios.post(`/ticket/cancel/${ticketId}`);
        alert('Biglietto cancellato con successo.');
        this.tickets = this.tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, status: 'canceled' } : ticket
        );
      } catch (error) {
        console.error('Errore durante la cancellazione del biglietto:', error);
        alert('Errore durante la cancellazione del biglietto.');
      }
    },
  },
};
</script>