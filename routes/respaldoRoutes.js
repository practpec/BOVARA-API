const express = require('express');
const respaldoController = require('../controllers/respaldoController');

const router = express.Router();

router.post('/api/respaldo', respaldoController.createRespaldo);
router.get('/api/respaldo', respaldoController.getRespaldos);

module.exports = router;
