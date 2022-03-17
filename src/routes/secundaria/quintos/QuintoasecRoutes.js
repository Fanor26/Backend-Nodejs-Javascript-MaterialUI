const {Router} = require( 'express') 
const router = Router() 
const QuintoasecCtrl = require('../../../controllers/secundaria/quintos/QuintoasecControllers') 
const Auth= require('../../../helper/Auth')
router.post('/crear',QuintoasecCtrl.crearQuintoasec),
router.post('/login',QuintoasecCtrl.login)


module.exports=router 
