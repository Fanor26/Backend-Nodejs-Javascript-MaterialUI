const SegundoasecsCtrl= {} 
const Segundoasec = require('../../../models/secundaria/segundos/SegundoasecModels')

const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
 
SegundoasecsCtrl.crearSegundoasec=async(req,res)=>{ 


const{primernombre,segundonombre,tercernombre,apellidopaterno,apellidomaterno,correomovil,contrasena}= req.body 
const NuevoSegundoasec = new Segundoasec({
    primernombre,
    segundonombre,
    tercernombre,
    apellidopaterno,
    apellidomaterno,
    correomovil, 
    contrasena, 
}) 
const correoSegundoasec = await Segundoasec.findOne({correomovil:correomovil})
 if(correoSegundoasec) 
 { 
     res.json({ 
         mensaje: 'El correo ya existe'
} ) 
}

else { 
    NuevoSegundoasec.contrasena = await bcrypt.hash(contrasena,10)
     const token = jwt.sign({_id:NuevoSegundoasec._id},"Secreto") 
     await NuevoSegundoasec.save() 

    res.json({ 
        mensaje: 'Bienvenido', 
    id: NuevoSegundoasec._id, 
    primernombre: NuevoSegundoasec.primernombre,
    segundonombre: NuevoSegundoasec.segundonombre,
    tercernombre: NuevoSegundoasec.tercernombre, 
    token,
      }) 
    } 
}


SegundoasecsCtrl.login= async(req,res)=> {

const {correomovil,contrasena}= req.body 
const segundoasec = await Segundoasec.findOne({correomovil:correomovil}) 
if(!segundoasec)
{
     return res.json({ 
         mensaje: 'Correo incorrecto' 
        }) 
    }

 const match = await bcrypt.compare(contrasena,segundoasec.contrasena) 
 if(match){

        const token =jwt.sign({_id: segundoasec._id},'Secreta')
        res.json({ 
             mensaje: 'Bienvenido',
              id: segundoasec.id,
              primernombre: segundoasec.primernombre,
    

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
    module.exports = SegundoasecsCtrl