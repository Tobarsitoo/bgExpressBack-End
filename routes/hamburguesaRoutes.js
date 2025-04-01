const express = require('express');
const router = express.Router();
const hamburguesaController = require('../controllers/hamburguesaController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Público
router.get('/', hamburguesaController.obtenerHamburguesas);

// Admin
router.post('/', auth.verifyToken, auth.isAdmin, upload.single('imagen'), hamburguesaController.crearHamburguesa);
router.put('/:id', auth.verifyToken, auth.isAdmin, upload.single('imagen'), hamburguesaController.editarHamburguesa);
router.delete('/:id', auth.verifyToken, auth.isAdmin, hamburguesaController.eliminarHamburguesa);

module.exports = router;
