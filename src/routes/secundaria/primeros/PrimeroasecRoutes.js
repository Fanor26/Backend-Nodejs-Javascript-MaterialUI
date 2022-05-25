const {Router} = require( 'express') 
const router = Router() 
const PrimeroasecCtrl = require('../../../controllers/secundaria/primeros/PrimeroasecControllers') 
const Primeroasec = require('../../../models/secundaria/primeros/PrimeroasecModels')
const Auth= require('../../../helper/Auth')
router.post('/crear',PrimeroasecCtrl.crearPrimeroasec),
router.post('/login',PrimeroasecCtrl.login)
router.get('/listarEstudiantes',PrimeroasecCtrl.listar)
//REQUEST FIND TAREAS BY ID

router.get("/listar/:id", async (req, res) => {
    try {
      // Find user by id
      let estudiante = await Primeroasec.findById(req.params.id);
      res.json(estudiante);
    } catch (err) {
      console.log(err);
    }
  });
router.delete('/eliminar/:id',PrimeroasecCtrl.eliminar),
router.put('/actualizar/:id',PrimeroasecCtrl.actualizar),
router.get('/listarEstudiantesCurso/:id',PrimeroasecCtrl.estudiantesDeunCurso)
module.exports=router 
