


// Requerimos las dependencias necesarias
const express = require('express')
const app = express()
const morgan = require('morgan')
const dotenv = require('dotenv'); 
const cors = require('cors')
const bodyparser = require('body-parser')
require('./database')


dotenv.config();
//Configuracion del puerto

app.set('Port',process.env.PORT || 5000);
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors({origen: '*'}));



//primeros secundaria

app.use('/primeroasec',require('./routes/secundaria/primeros/PrimeroasecRoutes'))

app.use('/primerobsec',require('./routes/secundaria/primeros/PrimerobsecRoutes'))
app.use('/primerocsec',require('./routes/secundaria/primeros/PrimerocsecRoutes'))

//segundos
app.use('/segundoasec',require('./routes/secundaria/segundos/SegundoasecRoutes'))

//terceros
app.use('/terceroasec',require('./routes/secundaria/terceross/TerceroansecRoutes'))


//cuartos
app.use('/cuartoasec',require('./routes/secundaria/cuartos/CuartoasecRoutes'))

//quintos

app.use('/quintoasec',require('./routes/secundaria/quintos/QuintoasecRoutes'))

//sextos 

app.use('/sextoasec',require('./routes/secundaria/sextos/SextoasecRoutes'))


app.use('/public', express.static('public'));

app.use("/user", require("./routes/user"));
app.use("/asistencia", require("./routes/AsistenciaRoutes"));

app.use("/practica", require("./routes/PracticaRoutes"));

/*
app.use("/curso", require("./routes/CursoRoutes"));*/


//register
const serverRouter= require('./routes/server/index');
app.use('/server', serverRouter)

app.listen(app.get('Port'),()=>{
    console.log('Servidor escuchando por el puerto',app.get('Port'))
   })
   