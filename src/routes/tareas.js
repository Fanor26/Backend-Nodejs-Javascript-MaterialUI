const express = require( 'express') 
const router = express.Router() 
const multer = require("multer")
const Tareas = require("../models/tareas");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, "/https://juanor902.herokuapp.com/uploads/")
},
filename: (req, file, cb) => {
  cb(null, file.originalname )
}
})

const upload = multer({
  storage: storage
})


//REQUEST GET ALL TAREAS
router.get('/', (req,res) =>{
  Tareas.find()
  .then(tarea =>res.json(tarea))
  .catch(err => res.status(400).json(`Error: ${err}`));

});

//REQUEST ADD NEW TAREA

router.post('/add', upload.single("tareaImage"), (req,res, next) =>{
 const newTarea= new Tareas({
    titulo:req.body.titulo,
    tarea:req.body.tarea,
    autornombre:req.body.autornombre,
    tareaImage:req.file.originalname,
   
 })
 

newTarea.save()

.then(() => res.json("La nueva Tarea creada Correctamente")) 
.catch(err => res.status(400).json(`Error: ${err}`));

})

//REQUEST FIND TAREAS BY ID
router.get('/:id', (req,res) =>{
    Tareas.findById(req.params.id)
    .then(tarea =>res.json(tarea))
    .catch(err => res.status(400).json(`Error: ${err}`));
})
//REQUEST FIND TAREAS BY UPDATE
router.put('/update/:id', upload.single("tareaImage"), (req,res) =>{
    Tareas.findById(req.params.id)
    .then((tarea) =>{
        tarea.titulo=req.body.titulo;
        tarea.tarea=req.body.tarea;
        tarea.autornombre=req.body.autornombre;
        tarea.tareaImage=req.file.originalname;
      
    
    tarea
    .save()
    .then(() => res.json("La Tarea se actualizo Correctamente")) 
    .catch(err => res.status(400).json(`Error: ${err}`));

    })
    .catch(err => res.status(400).json(`Error: ${err}`));
})  
//REQUEST FIND TAREAS BY DELETE
router.delete('/:id', (req,res) =>{
    Tareas.findByIdAndDelete(req.params.id)
    .then(() => res.json(" Tarea eliminada Correctamente")) 
    .catch(err => res.status(400).json(`Error: ${err}`));
  
  });
module.exports= router;