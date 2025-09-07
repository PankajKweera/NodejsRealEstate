const express = require("express");

const router = express.Router();

const multer = require("multer");
const path = require("path");

const userController = require("../controllers/user/user-controller");
const userlandController = require("../controllers/user/land-controller");
const landController = require("../controllers/land-controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|mp4/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images and Videos Only!");
  }
}

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Often
router.route("/all").get(landController.getall);

router.route("/getbylocation").get(landController.getbylocation);

// User
router.route("/getprofile").get(userController.myprofile);

router.route("/updateprofile").put(userController.updateprofile);

router.route("/deleteaccount").delete(userController.removeuser);

// router.route("/register/new/property").post(userlandController.register);
// router.route("/update/property").put(userlandController.update);

router
  .route(
    "/register/new/property",
    upload.fields([
      { name: "images", maxCount: 10 },
      { name: "video", maxCount: 1 },
    ])
  )
  .post(userlandController.register);

router
  .route(
    "/update/property",
    upload.fields([
      { name: "images", maxCount: 10 },
      { name: "video", maxCount: 1 },
    ])
  )
  .put(userlandController.update);

router.route("/remove/property").delete(userlandController.remove);

router.route("/myproperty").get(userlandController.getmyland);

// Invite new USER

router.route("/invitenewsms").post(userController.inviteuser);

// Shortlist

router
  .route("/properties/shortlist/:userId/:propertyId")
  .put(userlandController.shortlist);

// check status


// , upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), addListing);

module.exports = router;
