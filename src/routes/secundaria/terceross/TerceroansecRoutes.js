const {Router} = require( 'express') 
const router = Router() 
const TerceroasecCtrl = require('../../../controllers/secundaria/terceross/TerceroansecControllers') 
const Auth= require('../../../helper/Auth')
router.post('/crear',TerceroasecCtrl.crearTerceroasec),
router.post('/login',TerceroasecCtrl.login)


module.exports=router 
