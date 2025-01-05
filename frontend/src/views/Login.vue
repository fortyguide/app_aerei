<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        });
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
}
</style>