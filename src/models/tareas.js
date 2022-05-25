const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tareasSchema = new Schema({
    titulo:{type: String, required:true},
    tarea:{type: String, 
    
    },
    autornombre:{type: String, required:true},
    curso:String,
    ciudadNombre:String,
    name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      cloudinary_id: {
        type: String,
      },
    postDate:{type:Date, default:Date.now},

})

const Tareas =mongoose.model("Tarea", tareasSchema);
module.exports=Tareas;
//module.exports = mongoose.model('Tarea', tareasSchema)