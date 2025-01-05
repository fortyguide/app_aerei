import axios from '../axios';

const getFlights = async () => {
  const response = await axios.get('/flights');
  return response.data;
};

const getFlightById = async (id) => {
  const response = await axios.get(`/flights/${id}`);
  return response.data;
};

const createFlight = async (flightData) => {
  const response = await axios.post('/flights', flightData);
  return response.data;
};

const updateFlight = async (id, flightData) => {
  const response = await axios.put(`/flights/${id}`, flightData);
  return response.data;
};

const deleteFlight = async (id) => {
  const response = await axios.delete(`/flights/${id}`);
  return response.data;
};

export default {
  getFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight
};