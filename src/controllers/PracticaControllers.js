const PracticaCtrl = {};
const Practica = require("../models/PracticasModels");
const cloudinary = require("../utils/cloudinary");

PracticaCtrl.crear = async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new user
    let practica = new Practica({
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      curso: req.body.curso,
      estadoVacuna: req.body.estadoVacuna,
      dosisAplicadas: req.body.dosisAplicadas,
      ciudadNombre: req.body.ciudadNombre,
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await practica.save();
    res.json({ 
      mensaje: 'Practica Creada Correctamente'
} ) 
  } catch (err) {
    console.log(err);
  }
};

PracticaCtrl.listar = async (req, res) => {
  const respuesta = await Practica.find();
  res.json(respuesta);
};

PracticaCtrl.listarId = async (req, res) => {
  const id = req.params.id;

  const respuesta = await Practica.findById({ _id: id });
  res.json(respuesta);
};

PracticaCtrl.practicaDeunCurso = async (req, res) => {
  const id = req.params.id;

  const respuesta = await Practica.find({ curso: id });
  res.json(respuesta);
};
PracticaCtrl.eliminar = async (req, res) => {
  const id = req.params.id;

  await Practica.findByIdAndRemove({ _id: id });
  res.json({
    mensaje: "Practica eliminada",
  });
};

PracticaCtrl.actualizar = async (req, res) => {
  try {
    let practica = await Practica.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(practica.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      nombres: req.body.nombres || practica.nombres,
      apellidos: req.body.apellidos || practica.apellidos,
      curso: req.body.curso || practica.curso,
      estadoVacuna: req.body.estadoVacuna || practica.estadoVacuna,
      dosisAplicadas: req.body.dosisAplicadas || practica.dosisAplicadsa,
      ciudadNombre: req.body.dosisAplicadas || practica.ciudadNombre,
      name: req.body.name || practica.name,
      avatar: result?.secure_url || practica.avatar,
      cloudinary_id: result?.public_id || practica.cloudinary_id,
    };
    practica = await Practica.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(practica);
  } catch (err) {
    console.log(err);
  }
};
PracticaCtrl.buscarPracticaCriterio = async (req, res) => {
  const name = req.params.criterio;
  try {
    const respuesta = await Practica.find({ name: name });
    res.json(respuesta);
  } catch (error) {
    return res.status(400).json({
      mensaje: "ocurrio un error",
      error,
    });
  }
};

module.exports = PracticaCtrl;
