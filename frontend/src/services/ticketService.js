import axios from '../axios';

const getTickets = async () => {
  const response = await axios.get('/tickets');
  return response.data;
};

const getTicketById = async (id) => {
  const response = await axios.get(`/tickets/${id}`);
  return response.data;
};

const createTicket = async (ticketData) => {
  const response = await axios.post('/tickets', ticketData);
  return response.data;
};

const updateTicket = async (id, ticketData) => {
  const response = await axios.put(`/tickets/${id}`, ticketData);
  return response.data;
};

const deleteTicket = async (id) => {
  const response = await axios.delete(`/tickets/${id}`);
  return response.data;
};

export default {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};