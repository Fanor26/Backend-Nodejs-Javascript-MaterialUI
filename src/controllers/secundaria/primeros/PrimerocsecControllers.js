const PrimerocsecsCtrl= {} 
const Primerocsec = require('../../../models/secundaria/primeros/PrimerocsecModels')

const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
 
PrimerocsecsCtrl.crearPrimerocsec=async(req,res)=>{ 


const{primernombre,segundonombre,tercernombre,apellidopaterno,apellidomaterno,correomovil,contrasena}= req.body 
const NuevoPrimerocsec = new Primerocsec({
    primernombre,
    segundonombre,
    tercernombre,
    apellidopaterno,
    apellidomaterno,
    correomovil, 
    contrasena, 
}) 
const correoPrimerocsec = await Primerocsec.findOne({correomovil:correomovil})
 if(correoPrimerocsec) 
 { 
     res.json({ 
         mensaje: 'El correo ya existe'
} ) 
}

else { 
    NuevoPrimerocsec.contrasena = await bcrypt.hash(contrasena,10)
     const token = jwt.sign({_id:NuevoPrimerocsec._id},"Secreto") 
     await NuevoPrimerocsec.save() 

    res.json({ 
        mensaje: 'Bienvenido', 
    id: NuevoPrimerocsec._id, 
    primernombre: NuevoPrimerocsec.primernombre,
    segundonombre: NuevoPrimerocsec.segundonombre,
    tercernombre: NuevoPrimerocsec.tercernombre, 
    token,
      }) 
    } 
}


PrimerocsecsCtrl.login= async(req,res)=> {

const {correomovil,contrasena}= req.body 
const primerocsec = await Primerocsec.findOne({correomovil:correomovil}) 
if(!primerocsec)
{
     return res.json({ 
         mensaje: 'Correo incorrecto' 
        }) 
    }

 const match = await bcrypt.compare(contrasena,primerocsec.contrasena) 
 if(match){

        const token =jwt.sign({_id: primerocsec._id},'Secreta')
        res.json({ 
             mensaje: 'Bienvenido',
              id: primerocsec.id,
              primernombre: primerocsec.primernombre,
    

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
    module.exports = PrimerocsecsCtrl