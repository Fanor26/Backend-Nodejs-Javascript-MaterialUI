const {Router} = require( 'express') 
const router = Router() 
const SegundoasecCtrl = require('../../../controllers/secundaria/segundos/SegundoasecControllers') 
const Auth= require('../../../helper/Auth')
router.post('/crear',SegundoasecCtrl.crearSegundoasec),
router.post('/login',SegundoasecCtrl.login)


module.exports=router 
