const {Router} = require( 'express') 
const router = Router() 
const PrimerobsecCtrl = require('../../../controllers/secundaria/primeros/PrimerobsecControllers') 
const Auth= require('../../../helper/Auth')
router.post('/crear',PrimerobsecCtrl.crearPrimerobsec),
router.post('/login',PrimerobsecCtrl.login)


module.exports=router 
