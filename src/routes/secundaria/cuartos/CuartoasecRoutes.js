const {Router} = require( 'express') 
const router = Router() 
const CuartoasecCtrl = require('../../../controllers/secundaria/cuartos/CuartoasecControllers') 
const Auth= require('../../../helper/Auth')
router.post('/crear',CuartoasecCtrl.crearCuartoasec),
router.post('/login',CuartoasecCtrl.login)


module.exports=router 
