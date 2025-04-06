const express = require('express');
const connectDB = require('./mongodb');
require('dotenv').config();
const routes = require('./routes'); // Importation des routes

const app = express();

// Middleware
app.use(express.json()); // Pour parser les JSON

// Connexion à la DB
connectDB();

// Utilisation des routes
app.use('/api', routes);

// Route test
app.get('/', (req, res) => {
  res.send('API Mongoose prête 🧪');
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
