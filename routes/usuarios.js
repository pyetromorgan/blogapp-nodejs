const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const { route } = require('./admin');

router.get('/registro', UsuarioController.formularioRegistro);

router.post('/registro', UsuarioController.registrarUsuario);

router.get('/login', UsuarioController.formularioLogin);

router.get('/logout', UsuarioController.logout);

router.post('/login', UsuarioController.autenticarUsuario);

module.exports = router;