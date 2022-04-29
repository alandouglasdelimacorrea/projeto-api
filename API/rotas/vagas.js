const express = require('express');
const router = express.Router();

const vagasController = require('../controllers/vagas-controller');

router.get('/', vagasController.getVagas);

router.post('/', vagasController.postVagas);

router.delete('/', vagasController.deleteVagas);

router.patch('/', vagasController.patchVagas);

module.exports = router;