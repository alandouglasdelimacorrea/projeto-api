const express = require('express');
const router = express.Router();

const empresasController = require('../controllers/empresas-controller');

router.get('/', empresasController.getEmpresas);

router.post('/', empresasController.postEmpresas);

router.delete('/', empresasController.deleteEmpresas);

router.patch('/', empresasController.patchEmpresas);

module.exports = router;