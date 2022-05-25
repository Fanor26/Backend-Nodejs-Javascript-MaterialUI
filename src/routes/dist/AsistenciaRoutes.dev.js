"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = Router();

var AsistenciaCtrl = require('../controllers/AsistenciaControllers');

var Auth = require('../helper/Auth');

var upload = require("../utils/multer");

router.post('/crear', upload.single("image"), AsistenciaCtrl.crear), router.get('/listarAsistencias', AsistenciaCtrl.listar), router.get('/listar/:id', AsistenciaCtrl.listarId), router.get('/listarCriterio/:criterio', AsistenciaCtrl.buscarAsistenciaCriterio), router["delete"]('/eliminar/:id', AsistenciaCtrl.eliminar), router.put('/actualizar/:id', AsistenciaCtrl.actualizar), router.get('/listarAsistenciasCurso/:id', AsistenciaCtrl.asistenciaDeunCurso), module.exports = router;