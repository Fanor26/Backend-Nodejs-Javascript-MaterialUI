const QuintoasecsCtrl= {} 
const Quintoasec = require('../../../models/secundaria/quintos/QuintoasecModels')

const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
 
QuintoasecsCtrl.crearQuintoasec=async(req,res)=>{ 


const{primernombre,segundonombre,tercernombre,apellidopaterno,apellidomaterno,correomovil,contrasena}= req.body 
const NuevoQuintoasec = new Quintoasec({
    primernombre,
    segundonombre,
    tercernombre,
    apellidopaterno,
    apellidomaterno,
    correomovil, 
    contrasena, 
}) 
const correoQuintoasec = await Quintoasec.findOne({correomovil:correomovil})
 if(correoQuintoasec) 
 { 
     res.json({ 
         mensaje: 'El correo ya existe'
} ) 
}

else { 
    NuevoQuintoasec.contrasena = await bcrypt.hash(contrasena,10)
     const token = jwt.sign({_id:NuevoQuintoasec._id},"Secreto") 
     await NuevoQuintoasec.save() 

    res.json({ 
        mensaje: 'Bienvenido', 
    id: NuevoQuintoasec._id, 
    primernombre: NuevoQuintoasec.primernombre,
    segundonombre: NuevoQuintoasec.segundonombre,
    tercernombre: NuevoQuintoasec.tercernombre, 
    token,
      }) 
    } 
}


QuintoasecsCtrl.login= async(req,res)=> {

const {correomovil,contrasena}= req.body 
const quintoasec = await Quintoasec.findOne({correomovil:correomovil}) 
if(!quintoasec)
{
     return res.json({ 
         mensaje: 'Correo incorrecto' 
        }) 
    }

 const match = await bcrypt.compare(contrasena,quintoasec.contrasena) 
 if(match){

        const token =jwt.sign({_id: quintoasec._id},'Secreta')
        res.json({ 
             mensaje: 'Bienvenido',
              id: quintoasec.id,
              primernombre: quintoasec.primernombre,
    

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
    module.exports = QuintoasecsCtrl