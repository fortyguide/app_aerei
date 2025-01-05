const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const sequelize = require('./config/index');
const authRoutes = require('./routes/authRoute');
const ticketRoutes = require('./routes/ticketRoute');
const flightRoutes = require('./routes/flightRoute');
const historyRoutes = require('./routes/historyRoute')
const app = express();

// Middleware di sicurezza (Helmet)
app.use(helmet());

// Configurazione CORS
app.use(cors({
    origin: 'http://localhost:8080', // Permetti le richieste dal frontend
    credentials: true // Permetti l'invio di credenziali come cookie
}))

// Configurazione sessioni
app.use(session({
    secret: 'il_tuo_segreto_di_sessione',  // Cambia con un segreto sicuro
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,   // Impedisce l'accesso ai cookie da JavaScript
        secure: true,     // Imposta secure a true solo su HTTPS
        sameSite: 'strict' // Protezione contro attacchi CSRF
    }
}));

// Middleware per il parsing del body delle richieste
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint di test
app.get('/', (req, res) => {
    res.send('Server Express HTTPS è in esecuzione!');
});

// Configurazione delle chiavi SSL per HTTPS
const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),    // Leggi il file della chiave privata
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))   // Leggi il file del certificato
};

// Test della connessione al database
sequelize.authenticate()
    .then(() => {
        console.log('Connessione al database avvenuta con successo.');
    })
    .catch(err => {
        console.error('Errore di connessione al database:', err);
    });

// Sincronizzazione dei modelli User e Ticket
const syncModels = async () => {
    try {
        await sequelize.sync();
        console.log('Modelli sincronizzati con successo.');
    } catch (err) {
        console.error('Errore nella sincronizzazione del database:', err);
    }
};

syncModels();

// Usare le rotte
app.use('/api/auth', authRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/flight', flightRoutes);
app.use('/api/history', historyRoutes);

// Avvio del server HTTPS
https.createServer(options, app).listen(3000, () => {
    console.log('Server HTTPS in ascolto sulla porta 3000');
});
