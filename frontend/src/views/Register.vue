<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="name">Nome:</label>
        <input type="text" v-model="name" />
      </div>
      <div>
        <label for="surname">Cognome:</label>
        <input type="text" v-model="surname" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      surname: '',
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/auth/register', {
          email: this.email,
          password: this.password,
          name: this.name,
          surname: this.surname,
        });
        console.log(response.data);
        this.$router.push('/login');
      } catch (error) {
        this.error = error.response.data.message || 'Errore durante la registrazione.';
      }
    },
  },
};
</script>