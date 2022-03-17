const SextoasecsCtrl= {} 
const Sextoasec = require('../../../models/secundaria/sextos/SextoasecModels')

const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
 
SextoasecsCtrl.crearSextoasec=async(req,res)=>{ 


const{primernombre,segundonombre,tercernombre,apellidopaterno,apellidomaterno,correomovil,contrasena}= req.body 
const NuevoSextoasec = new Sextoasec({
    primernombre,
    segundonombre,
    tercernombre,
    apellidopaterno,
    apellidomaterno,
    correomovil, 
    contrasena, 
}) 
const correoSextoasec = await Sextoasec.findOne({correomovil:correomovil})
 if(correoSextoasec) 
 { 
     res.json({ 
         mensaje: 'El correo ya existe'
} ) 
}

else { 
    NuevoSextoasec.contrasena = await bcrypt.hash(contrasena,10)
     const token = jwt.sign({_id:NuevoSextoasec._id},"Secreto") 
     await NuevoSextoasec.save() 

    res.json({ 
        mensaje: 'Bienvenido', 
    id: NuevoSextoasec._id, 
    primernombre: NuevoSextoasec.primernombre,
    segundonombre: NuevoSextoasec.segundonombre,
    tercernombre: NuevoSextoasec.tercernombre, 
    token,
      }) 
    } 
}


SextoasecsCtrl.login= async(req,res)=> {

const {correomovil,contrasena}= req.body 
const sextoasec = await Sextoasec.findOne({correomovil:correomovil}) 
if(!sextoasec)
{
     return res.json({ 
         mensaje: 'Correo incorrecto' 
        }) 
    }

 const match = await bcrypt.compare(contrasena,sextoasec.contrasena) 
 if(match){

        const token =jwt.sign({_id: sextoasec._id},'Secreta')
        res.json({ 
             mensaje: 'Bienvenido',
              id: sextoasec.id,
              primernombre: sextoasec.primernombre,
    

              token
})
}
else 
{
 res.json({

        mensaje: 'Contraseña Incorrecta'

 })


}
}
    module.exports = SextoasecsCtrl