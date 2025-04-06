const express = require('express');
const profileRoutes = require('./api/profiles');

// Crée un router Express
const router = express.Router();

// Centralisation des routes
router.use('/profiles', profileRoutes);

module.exports = router;
