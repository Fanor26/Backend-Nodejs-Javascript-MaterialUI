const express = require( 'express') 
const router = express.Router() 
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Tareas = require("../models/tareas");

/*
//REQUEST GET ALL TAREAS
router.get('/', (req,res) =>{
  Tareas.find()
  .then(tarea =>res.json(tarea))
  .catch(err => res.status(400).json(`Error: ${err}`));

});

//REQUEST ADD NEW TAREA

router.post('/add', upload.single("image"), (req,res) =>{
   // Upload image to cloudinary
   const result =  cloudinary.uploader.upload(req.file.path);
 const newTarea= new Tareas({
    titulo:req.body.titulo,
    tarea:req.body.tarea,
    autornombre:req.body.autornombre,
    name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
  
   
 })
 
newTarea.save()

.then(() => res.json("La nueva Tarea creada Correctamente")) 
.catch(err => res.status(400).json(`Error: ${err}`));

})
*/
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new user
    let tarea = new Tareas({
      titulo:req.body.titulo,
    tarea:req.body.tarea,
    autornombre:req.body.autornombre,
    curso: req.body.curso,
    ciudadNombre: req.body.ciudadNombre,
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await tarea.save();
    res.json(tarea);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let tarea = await Tareas.find();
    res.json(tarea);
  } catch (err) {
    console.log(err);
  }
});

//REQUEST FIND TAREAS BY ID

/*router.get('/:id', (req,res) =>{
    Tareas.findById(req.params.id)
    .then(tarea =>res.json(tarea))
    .catch(err => res.status(400).json(`Error: ${err}`));
})*/
router.get("/:id", async (req, res) => {
  try {
    // Find user by id
    let tarea = await Tareas.findById(req.params.id);
    res.json(tarea);
  } catch (err) {
    console.log(err);
  }
});

router.get("/listarTareasEstudiante/:id", async (req, res) => {
  try{

  
  const id = req.params.id;

  const tarea = await Tareas.find({ curso: id });
  res.json(tarea);
} catch (err) {
  console.log(err);
}
});


//REQUEST FIND TAREAS BY UPDATE
/*
router.put('/update/:id',(req,res) =>{
    Tareas.findById(req.params.id)
    .then((tarea) =>{
        tarea.titulo=req.body.titulo;
        tarea.tarea=req.body.tarea;
        tarea.autornombre=req.body.autornombre;
      
      
    
    tarea
    .save()
    .then(() => res.json("La Tarea se actualizo Correctamente")) 
    .catch(err => res.status(400).json(`Error: ${err}`));

    })
    .catch(err => res.status(400).json(`Error: ${err}`));
})*/

router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    let tarea = await Tareas.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(tarea.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      titulo: req.body.titulo || tarea.titulo,
      tarea: req.body.tarea || tarea.tarea,
      autornombre: req.body.autornombre || tarea.autornombre,
      curso: req.body.curso || tarea.curso,
      ciudadNombre: req.body.ciudadNombre || tarea.ciudadNombre,
      name: req.body.name || tarea.name,
      avatar: result?.secure_url || tarea.avatar,
      cloudinary_id: result?.public_id || tarea.cloudinary_id,
    };
    tarea = await Tareas.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(tarea);
  } catch (err) {
    console.log(err);
  }
});

//REQUEST FIND TAREAS BY DELETE
router.delete('/:id', (req,res) =>{
    Tareas.findByIdAndDelete(req.params.id)
    .then(() => res.json(" Tarea eliminada Correctamente")) 
    .catch(err => res.status(400).json(`Error: ${err}`));
  
  });
module.exports= router;