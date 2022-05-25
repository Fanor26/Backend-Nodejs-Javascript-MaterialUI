const {Router} = require( 'express') 
const router = Router() 
const AsistenciaCtrl = require('../controllers/AsistenciaControllers')
const Auth =require('../helper/Auth')
const upload = require("../utils/multer");

router.post('/crear',upload.single("image"),AsistenciaCtrl.crear),
router.get('/listarAsistencias',AsistenciaCtrl.listar),
router.get('/listar/:id',AsistenciaCtrl.listarId),
router.get('/listarCriterio/:criterio',AsistenciaCtrl.buscarAsistenciaCriterio),
router.delete('/eliminar/:id',AsistenciaCtrl.eliminar),
router.put('/actualizar/:id',AsistenciaCtrl.actualizar),
router.get('/listarAsistenciasEstudiante/:id',AsistenciaCtrl.asistenciaDeunEstudiante),

module.exports= router