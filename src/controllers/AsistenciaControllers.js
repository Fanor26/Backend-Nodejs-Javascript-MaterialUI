const AsistenciaCtrl= {} 
const Asistencia = require('../models/Asistenciamodels')
const cloudinary = require("../utils/cloudinary");
AsistenciaCtrl.crear = async(req, res)=>{
   /* try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);*/
    
        // Create new user

    const {nombres, apellidos, estudiantetoken, estadoVacuna, dosisAplicadas,cursoNombre /*name*/}= req.body
    
    const asistencia =  new Asistencia({
        nombres, 
        apellidos, 
        estudiantetoken,
        estadoVacuna,
        dosisAplicadas,
        cursoNombre, 
        /*name,
        avatar: result.secure_url,
      cloudinary_id: result.public_id,*/




    })

     // Save user
     await asistencia.save();
     res.json({ 
        mensaje: 'Asistencia Creada Correctamente'
} ) 
}
 /*} catch (err) {
     console.log(err);
   }
 };
 */
 

  

AsistenciaCtrl.listar = async(req,res)=>{

    const respuesta = await Asistencia.find()
    res.json(respuesta)


}
AsistenciaCtrl.listarId = async(req,res)=>{
    const id= req.params.id

    const respuesta = await Asistencia.findById({_id:id})
    res.json(respuesta)


}

AsistenciaCtrl.asistenciaDeunEstudiante = async(req,res)=>{
    const id= req.params.id

    const respuesta = await Asistencia.find({estudiantetoken:id})
    res.json(respuesta)
   

}

AsistenciaCtrl.eliminar = async(req,res)=>{
    const id= req.params.id

     await Asistencia.findByIdAndRemove({_id:id})
     res.json({

        mensaje:'Asistencia eliminada'


     })
    }

     AsistenciaCtrl.actualizar= async(req,res)=>{
        const id= req.params.id
    
         await Asistencia.findByIdAndUpdate({_id:id}, req.body)
         res.json({
    
            mensaje:'Asistencia actualizada'
    
    
         })
        }
        AsistenciaCtrl.buscarAsistenciaCriterio= async(req,res)=>{
            const estadoVacuna= req.params.criterio;
        try 
        {
         const respuesta =    await Asistencia.find({estadoVacuna:estadoVacuna})
             res.json(respuesta)
        
    
            }catch(error){


                return res.status(400).json({
                        mensaje:"ocurrio un error",
                        error



                })
            
        }
}
module.exports = AsistenciaCtrl