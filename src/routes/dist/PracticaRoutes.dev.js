"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = Router();

var PracticaCtrl = require('../controllers/PracticaControllers');

var Auth = require('../helper/Auth');

var upload = require("../utils/multer");

router.post('/crear', upload.single("image"), PracticaCtrl.crear), router.get('/listarPracticas', PracticaCtrl.listar), router.get('/listar/:id', PracticaCtrl.listarId), router["delete"]('/eliminar/:id', PracticaCtrl.eliminar), router.put('/actualizar/:id', upload.single("image"), PracticaCtrl.actualizar), router.get('/listarPracticasCurso/:id', PracticaCtrl.practicaDeunCurso), router.get('/listarCriterio/:criterio', PracticaCtrl.buscarPracticaCriterio), module.exports = router;