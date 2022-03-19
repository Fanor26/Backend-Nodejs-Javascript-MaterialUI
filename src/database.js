//Creamos nuestra base de datos

const mongoose = require('mongoose')

URI ='mongodb+srv://fanor2030:fanor2030@cluster0.3gqcv.mongodb.net/IMAGENESASISTENCIA?retryWrites=true&w=majority'




mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then (db => console.log('Base de datos conectado', db.connection.name)).catch(error => console.log(error))

module.exports= mongoose
