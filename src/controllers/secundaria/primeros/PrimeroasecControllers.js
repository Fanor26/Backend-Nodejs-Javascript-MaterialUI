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
    apellidopaterno: NuevoPrimeroasec.apellidopaterno,
    apellidomaterno: NuevoPrimeroasec.apellidomaterno,
    token,
      }) 
    } 
}

PrimeroasecsCtrl.listar = async(req,res)=>{

    const respuesta = await Primeroasec.find()
    res.json(respuesta)


}/*
PrimeroasecsCtrl.listarId = async(req,res)=>{
    const id= req.params.id

    const respuesta = await Primeroasec.findById({_id:id})
    res.json(respuesta)


}
*/
PrimeroasecsCtrl.estudiantesDeunCurso = async(req,res)=>{
    const id= req.params.id

    const respuesta = await Primeroasec.find({curso:id})
    res.json(respuesta)
   

}


PrimeroasecsCtrl.eliminar = async(req,res)=>{
    const id= req.params.id

     await Primeroasec.findByIdAndRemove({_id:id})
     res.json({

        mensaje:'Estudiante eliminado'


     })
    }

    PrimeroasecsCtrl.actualizar= async(req,res)=>{
        const id= req.params.id
    
         await Primeroasec.findByIdAndUpdate({_id:id}, req.body)
         res.json({
    
            mensaje:'Estudiante actualizado'
    
    
         })
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
              segundonombre: primeroasec.segundonombre,
              tercernombre: primeroasec.tercernombre,
              apellidopaterno: primeroasec.apellidopaterno,
              apellidomaterno:primeroasec.apellidomaterno,

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