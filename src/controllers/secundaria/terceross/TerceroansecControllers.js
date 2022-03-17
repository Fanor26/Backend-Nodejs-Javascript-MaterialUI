const TerceroasecsCtrl= {} 
const Terceroasec = require('../../../models/secundaria/terceross/TerceroasecModels')

const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
 
TerceroasecsCtrl.crearTerceroasec=async(req,res)=>{ 


const{primernombre,segundonombre,tercernombre,apellidopaterno,apellidomaterno,correomovil,contrasena}= req.body 
const NuevoTerceroasec = new Terceroasec({
    primernombre,
    segundonombre,
    tercernombre,
    apellidopaterno,
    apellidomaterno,
    correomovil, 
    contrasena, 
}) 
const correoTerceroasec = await Terceroasec.findOne({correomovil:correomovil})
 if(correoTerceroasec) 
 { 
     res.json({ 
         mensaje: 'El correo ya existe'
} ) 
}

else { 
    NuevoTerceroasec.contrasena = await bcrypt.hash(contrasena,10)
     const token = jwt.sign({_id:NuevoTerceroasec._id},"Secreto") 
     await NuevoTerceroasec.save() 

    res.json({ 
        mensaje: 'Bienvenido', 
    id: NuevoTerceroasec._id, 
    primernombre: NuevoTerceroasec.primernombre,
    segundonombre: NuevoTerceroasec.segundonombre,
    tercernombre: NuevoTerceroasec.tercernombre, 
    token,
      }) 
    } 
}


TerceroasecsCtrl.login= async(req,res)=> {

const {correomovil,contrasena}= req.body 
const terceroasec = await Terceroasec.findOne({correomovil:correomovil}) 
if(!terceroasec)
{
     return res.json({ 
         mensaje: 'Correo incorrecto' 
        }) 
    }

 const match = await bcrypt.compare(contrasena,terceroasec.contrasena) 
 if(match){

        const token =jwt.sign({_id: terceroasec._id},'Secreta')
        res.json({ 
             mensaje: 'Bienvenido',
              id: terceroasec.id,
              primernombre: terceroasec.primernombre,
    

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
    module.exports = TerceroasecsCtrl