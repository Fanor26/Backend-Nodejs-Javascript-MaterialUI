const router = require("express").Router();
const USER = require('../../models/database/user');
var md5 = require("md5");

const  jwt = require("jsonwebtoken");


 router.post('/autenthication/login', async(req, res) => {
  console.log(req.body);
  const { body } = req;
  
  if (Object.keys(body).length == 0) {
    res.status(300).json({ mensaje: 'Error: Nose han enviado parametros para realizar la autenticacion '})
    return;
  }
  const { email, password } = body;
  if (email == null) {
    res.status(300).json({ mensaje: 'Error: Nose han enviado parametros para realizar la autenticacion '})
    return;
  }
  if (password == null) {
    res.status(300).json({ mensaje: 'Error: Nose han enviado parametros para realizar la autenticacion '})
    return;
  }
  const user = await USER.findOne({email: email, password: md5(password)});
  console.log(user);
  if (user) {
    const token = jwt.sign({id: user._id, email: user.email}, "secret");
    res.status(200).json({ mensaje: {user, token}});
    return;
  }
  res.status(200).json({mensaje: 'Error de login credenciales incorrectas'});
});
/**
 * @swagger
 * /server/autenthication/register:
 *  post:
 *    summary: register a new user into the system
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/register'
 *    responses:
 *      200:
 *        description: busqueda
 */
router.post('/autenthication/register', async(req, res) => {
  const { body } = req;
  if (Object.keys(body).length == 0) {
    res.status(300).json({ mensaje: 'Error: No se han enviado parametros para la autenticacion '})
    return;
  }
  const {email, password} = body;
  if (email == null) {
    res.status(300).json({ mensaje: 'Es necesario un email para continuar con el registro'});
    return;
  }
  if (password == null) {
    res.status(300).json({ mensaje: 'Es necesario un password para continuar con el registro'});
    return;
  }
  const cypherPassword = md5(password);
  USER.findOne({ email }).then(( user ) => {
    if (user) {
      res.status(300).json( {mensaje: `El email ${email} ya se encuentra registrado`});
      return;
    }
    const newUser = new USER({
      email,
      password: cypherPassword
    });
    newUser.save();
    res.status(200).json({mensaje: `Usuario registrado con exito`, newUser});
  });
});



module.exports = router;