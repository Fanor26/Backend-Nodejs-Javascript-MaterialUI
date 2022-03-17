const PrimeroasecsCtrl= {} 
const Primeroasec = require('../../../models/secundaria/primeros/PrimeroasecModels')

const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
 
PrimeroasecsCtrl.crearPrimeroasec=async(req,res)=>{ 


const{primernombre,segundonombre,tercernombre,apellidopaterno,apellidomaterno,correomovil,contrasena}= req.body 
const NuevoPrimeroasec = new Primeroasec({
    primernombre,
    segundonombre,
    tercernombre,
    apellidopaterno,
    apellidomaterno,
    correomovil, 
    contrasena, 
}) 
const correoPrimeroasec = await Primeroasec.findOne({correomovil:correomovil})
 if(correoPrimeroasec) 
 { 
     res.json({ 
         mensaje: 'El correo ya existe'
} ) 
}

else { 
    NuevoPrimeroasec.contrasena = await bcrypt.hash(contrasena,10)
     const token = jwt.sign({_id:NuevoPrimeroasec._id},"Secreto") 
     await NuevoPrimeroasec.save() 

    res.json({ 
        mensaje: 'Bienvenido', 
    id: NuevoPrimeroasec._id, 
    primernombre: NuevoPrimeroasec.primernombre,
    segundonombre: NuevoPrimeroasec.segundonombre,
    tercernombre: NuevoPrimeroasec.tercernombre, 
    token,
      }) 
    } 
}


PrimeroasecsCtrl.login= async(req,res)=> {

const {correomovil,contrasena}= req.body 
const primeroasec = await Primeroasec.findOne({correomovil:correomovil}) 
if(!primeroasec)
{
     return res.json({ 
         mensaje: 'Correo incorrecto' 
        }) 
    }

 const match = await bcrypt.compare(contrasena,primeroasec.contrasena) 
 if(match){

        const token =jwt.sign({_id: primeroasec._id},'Secreta')
        res.json({ 
             mensaje: 'Bienvenido',
              id: primeroasec.id,
              primernombre: primeroasec.primernombre,
    

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
    module.exports = PrimeroasecsCtrl