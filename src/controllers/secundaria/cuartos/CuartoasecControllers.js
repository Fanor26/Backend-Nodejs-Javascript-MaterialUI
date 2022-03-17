const CuartoasecsCtrl= {} 
const Cuartooasec = require('../../../models/secundaria/cuartos/CuartoasecModels')

const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
 
CuartoasecsCtrl.crearCuartoasec=async(req,res)=>{ 


const{primernombre,segundonombre,tercernombre,apellidopaterno,apellidomaterno,correomovil,contrasena}= req.body 
const NuevoCuartooasec = new Cuartooasec({
    primernombre,
    segundonombre,
    tercernombre,
    apellidopaterno,
    apellidomaterno,
    correomovil, 
    contrasena, 
}) 
const correoCuartooasec = await Cuartooasec.findOne({correomovil:correomovil})
 if(correoCuartooasec) 
 { 
     res.json({ 
         mensaje: 'El correo ya existe'
} ) 
}

else { 
    NuevoCuartooasec.contrasena = await bcrypt.hash(contrasena,10)
     const token = jwt.sign({_id:NuevoCuartooasec._id},"Secreto") 
     await NuevoCuartooasec.save() 

    res.json({ 
        mensaje: 'Bienvenido', 
    id: NuevoCuartooasec._id, 
    primernombre: NuevoCuartooasec.primernombre,
    segundonombre: NuevoCuartooasec.segundonombre,
    tercernombre: NuevoCuartooasec.tercernombre, 
    token,
      }) 
    } 
}


CuartoasecsCtrl.login= async(req,res)=> {

const {correomovil,contrasena}= req.body 
const cuartooasec = await Cuartooasec.findOne({correomovil:correomovil}) 
if(!cuartooasec)
{
     return res.json({ 
         mensaje: 'Correo incorrecto' 
        }) 
    }

 const match = await bcrypt.compare(contrasena,cuartooasec.contrasena) 
 if(match){

        const token =jwt.sign({_id: cuartooasec._id},'Secreta')
        res.json({ 
             mensaje: 'Bienvenido',
              id: cuartooasec.id,
              primernombre: cuartooasec.primernombre,
    

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
    module.exports = CuartoasecsCtrl