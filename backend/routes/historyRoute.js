const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const History = require('../models/historyModel');

router.get('/read', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Utente non autenticato.' });
    }

    try {
        const { operation, departureTime, destination } = req.query;
        
        // Costruisce il filtro dinamico
        const filters = { userId: req.session.userId };
        if (operation) {
            filters.operation = operation;
        }
        if (departureTime) {
            filters.departureTime >= departureTime;
        }
        if (destination) {
            filters.destination = {
                [Op.like]: `%${destination}%`,
            };
        }

        const history = await History.findAll({
            where: filters,
            attributes: ['ticketId', 'operation', 'flightNumber', 'departureTime', 'destination', 'timestamp'],
        });

        if (history.length === 0) {
            return res.status(400).json({ message: 'Non è stata effettuata ancora nessuna operazione.' });
        }

        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante il recupero dello storico.', error });
    }
});

module.exports = router;
