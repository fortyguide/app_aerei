<template>
  <div class="flights">
    <h1>Flights</h1>
    <ul>
      <li v-for="flight in flights" :key="flight._id">
        {{ flight.destination }} - {{ flight.date }}
      </li>
    </ul>
  </div>
</template>

<script>
import flightService from '../services/flightService';

export default {
  data() {
    return {
      flights: []
    };
  },
  async created() {
    try {
      this.flights = await flightService.getFlights();
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  }
};
</script>

<style scoped>
.flights {
  max-width: 600px;
  margin: 0 auto;
}
</style>