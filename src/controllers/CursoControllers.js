/*const CursosCtrl= {} 
const Curso = require('../models/CursoModels')

const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
 
CursosCtrl.crear=async(req,res)=>{ 


const{nombre,primernombre,correo,contrasena}= req.body 
const NuevoCurso = new Curso({
nombre,
primernombre,
    correo, 
    contrasena, 
}) 
const correoCurso = await Curso.findOne({correo:correo})
 if(correoCurso) 
 { 
     res.json({ 
         mensaje: 'El correo ya existe'
} ) 
}

else { 
    NuevoCurso.contrasena = await bcrypt.hash(contrasena,10)
     const token = jwt.sign({_id:NuevoCurso._id},"Secreto") 
     await NuevoCurso.save() 

    res.json({ 
        mensaje: 'Bienvenido', 
    id: NuevoCurso._id, 
    nombre: NuevoCurso.nombre,
    primernombre:NuevoCurso.primernombre,
    token,
      }) 
    } 
}

CursosCtrl.listar = async(req,res)=>{

    const respuesta = await Curso.find()
    res.json(respuesta)


}

CursosCtrl.login= async(req,res)=> {

const {correo,contrasena}= req.body 
const curso = await Curso.findOne({correo:correo}) 
if(!curso)
{
     return res.json({ 
         mensaje: 'Correo incorrecto' 
        }) 
    }

 const match = await bcrypt.compare(contrasena,curso.contrasena) 
 if(match){

        const token =jwt.sign({_id: curso._id},'Secreta')
        res.json({ 
             mensaje: 'Bienvenido',
              id: curso.id,
              nombre: curso.nombre,
              primernombre:curso.primernombre,
              token,
})
}
else 
{
 res.json({

        mensaje: 'Contraseña Incorrecta'

 })


}
}
    module.exports = CursosCtrl*/