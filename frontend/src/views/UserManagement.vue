<template>
  <div>
    <h1>Gestione Utenti</h1>
    <div v-if="users.length">
      <table>
        <thead>
          <tr>
            <th>ID Utente</th>
            <th>Email</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Ruolo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="deleteUser(user.id)">Elimina</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Nessun utente disponibile.</p>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'UserManagement',
  data() {
    return {
      users: [],
    };
  },
  async created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/admin/users');
        this.users = response.data;
      } catch (error) {
        console.error('Errore nel recupero degli utenti:', error);
      }
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`/admin/users/${userId}`);
        alert('Utente eliminato con successo.');
        this.fetchUsers();
      } catch (error) {
        console.error('Errore durante l\'eliminazione dell\'utente:', error);
        alert('Errore durante l\'eliminazione dell\'utente.');
      }
    },
  },
};
</script>