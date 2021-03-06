const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../models/user");
const Auth = require('../helper/Auth')
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new user
    let user = new User({
      autor: req.body.autor,
      curso: req.body.curso,
      ciudadNombre: req.body.ciudadNombre,
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      autor: req.body.autor || user.autor,
      curso: req.body.curso || user.curso,
      ciudadNombre: req.body.ciudadNombre || user.ciudadNombre,
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});


router.get("/listarUsersCurso/:id", async (req, res) => {
  try{

  
  const id = req.params.id;

  const user = await User.find({ curso: id });
  res.json(user);
} catch (err) {
  console.log(err);
}
});

router.post('/autenthication/register', async(req, res) => {
  const { body } = req;
  if (Object.keys(body).length == 0) {
    res.status(300).json({ msn: 'Error: No se han enviado parametros para la autenticacion '})
    return;
  }
  const {email, password} = body;
  if (email == null) {
    res.status(300).json({ msn: 'Es necesario un email para continuar con el registro'});
    return;
  }
  if (password == null) {
    res.status(300).json({ msn: 'Es necesario un password para continuar con el registro'});
    return;
  }
  const cypherPassword = md5(password);
  USER.findOne({ email }).then(( user ) => {
    if (user) {
      res.status(300).json( {msn: `El email ${email} ya se encuentra registrado`});
      return;
    }
    const newUser = new USER({
      email,
      password: cypherPassword
    });
    newUser.save();
    res.status(200).json({msn: `Usuario registrado con exito`, newUser});
  });
});

module.exports = router;
