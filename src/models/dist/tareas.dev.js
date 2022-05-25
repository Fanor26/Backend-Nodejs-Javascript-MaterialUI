"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var tareasSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  tarea: {
    type: String
  },
  autornombre: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  cloudinary_id: {
    type: String
  },
  postDate: {
    type: Date,
    "default": Date.now
  }
});
var Tareas = mongoose.model("Tarea", tareasSchema);
module.exports = Tareas; //module.exports = mongoose.model('Tarea', tareasSchema)