const {Router} = require( 'express') 
const router = Router() 
const SextoasecCtrl = require('../../../controllers/secundaria/sextos/SextoasecControllers') 
const Auth= require('../../../helper/Auth')
router.post('/crear',SextoasecCtrl.crearSextoasec),
router.post('/login',SextoasecCtrl.login)


module.exports=router 
