const {Router} = require( 'express') 
const router = Router() 
const PrimeroasecCtrl = require('../../../controllers/secundaria/primeros/PrimeroasecControllers') 
const Auth= require('../../../helper/Auth')
router.post('/crear',PrimeroasecCtrl.crearPrimeroasec),
router.post('/login',PrimeroasecCtrl.login)


module.exports=router 
