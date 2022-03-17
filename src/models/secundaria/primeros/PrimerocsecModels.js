const mongoose = require('mongoose') 
const {Schema}= mongoose 
const PrimerocsecSchema = new Schema({ 
primernombre:String, 
segundonombre:String,
tercernombre:String,
apellidopaterno:String,
apellidomaterno:String,
correomovil:String, 
contrasena: String, 
date:{type:Date,default:Date.now} 

})
//Convertir modelo 
module.exports= mongoose.model('primerocsec',PrimerocsecSchema) 