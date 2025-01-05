<template>
  <div class="tickets">
    <h1>Tickets</h1>
    <ul>
      <li v-for="ticket in tickets" :key="ticket._id">
        {{ ticket.flight }} - {{ ticket.seat }}
      </li>
    </ul>
  </div>
</template>

<script>
import ticketService from '../services/ticketService';

export default {
  data() {
    return {
      tickets: []
    };
  },
  async created() {
    try {
      this.tickets = await ticketService.getTickets();
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }
};
</script>

<style scoped>
.tickets {
  max-width: 600px;
  margin: 0 auto;
}
</style>