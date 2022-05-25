"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = Router();

var cursoCtrl = require('../controllers/CursoControllers');

router.post('/crear', cursoCtrl.crear), router.post('/login', cursoCtrl.login), router.get('/listarCursos', cursoCtrl.listar), module.exports = router;