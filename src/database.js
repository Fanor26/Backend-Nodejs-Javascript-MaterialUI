//Creamos nuestra base de datos

const mongoose = require('mongoose')

URI ='mongodb+srv://fanor2022:fanor2022@cluster0.zcdns.mongodb.net/Vacunados?retryWrites=true&w=majority'




mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then (db => console.log('Base de datos conectado', db.connection.name)).catch(error => console.log(error))

module.exports= mongoose
