const  express=require("express");
const router=express.Router()
const controller=require("../controllers/authController")
const galarycontroller=require("../controllers/galaryController")
const carosolController=require("../controllers/carosolController")
const upload=require('../multer/multer');
const { requireSignIn, isAdmin } = require("../middleware/Varification");

router.get("/read",controller.read)
router.post("/register",upload.single("image"),controller.register)
router.put("/update/:id", requireSignIn, upload.single("image"),controller.updateUser)
router.get("/single-user/:id",controller.user)
router.post("/login",controller.login)
router.post("/send-email",controller.sendEmail)

router.get('/user-auth',requireSignIn,(req,res)=>{
    console.log("varify user",req.user)
    res.status(200).json({ok:true})
})
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    console.log("varify user",req.user)
    res.status(200).json({ok:true})
})

router.post('/galary',upload.single("image"),galarycontroller.galary)
router.get('/galaryImage',galarycontroller.galaryImage)
router.delete('/gelary-deleteItem/:id',galarycontroller.deleteItem)
router.put('/galary-update/:id',upload.single("image"),galarycontroller.updateGalary)
router.get('/single-image/:id',galarycontroller.signleImage)
router.get('/download/:id',galarycontroller.downloadImage)
//Home page carosel

// POST route for uploading the image
router.post("/carocel", upload.single("image"), carosolController.carocel);
router.get("/allimage",carosolController.allImage);

// PUT route for updating an existing image by ID
router.put("/carocel/:id", upload.single("image"), carosolController.updateCarocelImage);

// DELETE route for deleting an image by ID
router.delete("/carocel/:id", carosolController.deleteCarocelImage);



module.exports=router;
