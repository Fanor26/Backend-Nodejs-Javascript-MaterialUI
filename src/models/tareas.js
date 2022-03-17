const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tareasSchema = new Schema({
    titulo:{type: String, required:true},
    tarea:{type: String, required:true},
    autornombre:{type: String, required:true},
    tareaImage:{type: String, required:true},
    postDate:{type:Date, default:Date.now},

})

const Tareas =mongoose.model("Tarea", tareasSchema);
module.exports=Tareas;
//module.exports = mongoose.model('Tarea', tareasSchema)