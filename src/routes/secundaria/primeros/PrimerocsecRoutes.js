const {Router} = require( 'express') 
const router = Router() 
const PrimerocsecCtrl = require('../../../controllers/secundaria/primeros/PrimerocsecControllers') 
const Auth= require('../../../helper/Auth')
router.post('/crear',PrimerocsecCtrl.crearPrimerocsec),
router.post('/login',PrimerocsecCtrl.login)


module.exports=router 
