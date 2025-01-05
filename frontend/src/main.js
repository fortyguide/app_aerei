import { createApp } from 'vue'; // Importa createApp da vue
import App from './App.vue';
import router from './router';
import store from './store'; // Assicurati che il percorso sia corretto

// Crea l'istanza dell'app Vue
const app = createApp(App);

// Utilizza il router e lo store
app.use(router);
app.use(store);

// Monta l'app
app.mount('#app');