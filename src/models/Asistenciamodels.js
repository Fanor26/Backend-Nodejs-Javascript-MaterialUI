const mongoose = require("mongoose");
const Schema = mongoose.Schema

const AsistenciasShema = new Schema({

nombres:{type:String, required:[true,'Nombre obligatorio']},
apellidos:String,
estudiantetoken:String,
estadoVacuna:String,
dosisAplicadas:String,
cursoNombre:String,
name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
date:{type:Date,default:Date.now}


})

module.exports = mongoose.model('asistencias', AsistenciasShema )

