<template>
  <div>
    <h1>Profile</h1>
    <div v-if="user">
      <p>Email: {{ user.email }}</p>
      <p>Nome: {{ user.name }}</p>
      <p>Cognome: {{ user.surname }}</p>
      <p>Ruolo: {{ user.role }}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logout']),
  },
  created() {
    this.$store.dispatch('fetchUser');
  }
};
</script>