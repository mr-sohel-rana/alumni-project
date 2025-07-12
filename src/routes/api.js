 const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");
const galarycontroller = require("../controllers/galaryController");
const carosolController = require("../controllers/carosolController");
const upload = require("../multer/multer");
const { requireSignIn, isAdmin } = require("../middleware/Varification");
const BloodController=require ("../controllers/BloodControler")
// User routes

router.post("/register", upload.single("image"), controller.register);
router.put("/update/:id", requireSignIn, upload.single("image"), controller.updateUser);
router.get("/single-user/:id", controller.user);
router.post("/login", controller.login);
router.post("/send-email", controller.sendEmail);
router.put("/update-role/:id", controller.updateUserRole);

 router.get("/reads", controller.read);
router.get("/readsss",BloodController.getPost);
 router.post   ("/posts",      BloodController.createPost);   // CREATE
router.get    ("/posts",      BloodController.getPosts);     // READ  all
router.get    ("/posts/:id",  BloodController.getPost);      // READ  one
router.put    ("/posts/:id",  BloodController.updatePost);   // UPDATE
router.delete ("/posts/:id",  BloodController.deletePost);


// Auth verification routes
router.get("/user-auth", requireSignIn, (req, res) => {
  console.log("verify user", req.user);
  res.status(200).json({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  console.log("verify admin", req.user);
  res.status(200).json({ ok: true });
});

// Galary routes
router.post("/galary", upload.single("image"), galarycontroller.galary);
router.get("/galaryImage", galarycontroller.galaryImage);
router.delete("/gelary-deleteItem/:id", galarycontroller.deleteItem);
router.put("/galary-update/:id", upload.single("image"), galarycontroller.updateGalary);
router.get("/single-image/:id", galarycontroller.signleImage);
router.get("/download/:id", galarycontroller.downloadImage);

// Carosol routes
router.post("/carocel", upload.single("image"), carosolController.carocel);
router.get("/allimage", carosolController.allImage);
router.put("/carocel/:id", upload.single("image"), carosolController.updateCarocelImage);
router.delete("/carocel/:id", carosolController.deleteCarocelImage);

module.exports = router;
