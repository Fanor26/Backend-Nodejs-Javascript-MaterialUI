const PrimerobsecsCtrl= {} 
const Primerobsec = require('../../../models/secundaria/primeros/PrimerobsecModels')

const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
 
PrimerobsecsCtrl.crearPrimerobsec=async(req,res)=>{ 


const{primernombre,segundonombre,tercernombre,apellidopaterno,apellidomaterno,correomovil,contrasena}= req.body 
const NuevoPrimerobsec = new Primerobsec({
    primernombre,
    segundonombre,
    tercernombre,
    apellidopaterno,
    apellidomaterno,
    correomovil, 
    contrasena, 
}) 
const correoPrimerobsec = await Primerobsec.findOne({correomovil:correomovil})
 if(correoPrimerobsec) 
 { 
     res.json({ 
         mensaje: 'El correo ya existe'
} ) 
}

else { 
    NuevoPrimerobsec.contrasena = await bcrypt.hash(contrasena,10)
     const token = jwt.sign({_id:NuevoPrimerobsec._id},"Secreto") 
     await NuevoPrimerobsec.save() 

    res.json({ 
        mensaje: 'Bienvenido', 
    id: NuevoPrimerobsec._id, 
    primernombre: NuevoPrimerobsec.primernombre,
    segundonombre: NuevoPrimerobsec.segundonombre,
    tercernombre: NuevoPrimerobsec.tercernombre, 
    token,
      }) 
    } 
}


PrimerobsecsCtrl.login= async(req,res)=> {

const {correomovil,contrasena}= req.body 
const primerobsec = await Primerobsec.findOne({correomovil:correomovil}) 
if(!primerobsec)
{
     return res.json({ 
         mensaje: 'Correo incorrecto' 
        }) 
    }

 const match = await bcrypt.compare(contrasena,primerobsec.contrasena) 
 if(match){

        const token =jwt.sign({_id: primerobsec._id},'Secreta')
        res.json({ 
             mensaje: 'Bienvenido',
              id: primerobsec.id,
              primernombre: primerobsec.primernombre,
    

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
    module.exports = PrimerobsecsCtrl