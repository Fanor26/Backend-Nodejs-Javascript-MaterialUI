"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var AsistenciasShema = new Schema({
  nombres: {
    type: String,
    required: [true, 'Nombre obligatorio']
  },
  apellidos: String,
  curso: String,
  estadoVacuna: String,
  dosisAplicadas: String,
  ciudadNombre: String,
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  cloudinary_id: {
    type: String
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('asistencias', AsistenciasShema);