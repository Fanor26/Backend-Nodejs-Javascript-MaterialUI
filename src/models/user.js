const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  
  autor:{type:String, required:[true,'Nombre obligatorio']},

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
});

module.exports = mongoose.model("User", userSchema);
