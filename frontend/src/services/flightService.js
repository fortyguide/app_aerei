import axios from 'axios';

const API_URL = 'https://localhost:3000/api/flight/search';

const getFlights = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data.flights || [];
};

const flightService = {
  getFlights,
};

export default flightService;
