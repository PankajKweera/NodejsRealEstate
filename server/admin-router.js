const express = require("express");

const router = express.Router();

const adminusercontroller = require("../controllers/admin/admin-controller");

const adminlandcontroller = require("../controllers/admin/land-controller");

const landcontroller = require("../controllers/land-controller");

// user
router.route("/all/user").get(adminusercontroller.getalluser);

router.route("/user").get(adminusercontroller.userDetails);

// router.route('/user/update/:userId').get(adminusercontroller.updateuser);

router.route("/user/delete").delete(adminusercontroller.deleteuser);


router.route("/unverified").get(adminusercontroller.getallunverifedAdmin);
router.route("/verify/admin").put(adminusercontroller.verifyAdmin);
router.route("/verify/agent").put(adminusercontroller.verifyAgent);
router.route("/remove/verified").put(adminusercontroller.removeVerified);

// land

router.route("/land/all").get(adminlandcontroller.getallland);

router.route("/land/verify").put(adminlandcontroller.verifyland);

router.route("/land/unverified").get(adminlandcontroller.getunverified);

router.route("/land/update").put(adminlandcontroller.update);

router.route("/land/:landId").get(adminlandcontroller.getland);

router.route("/land/removeproperty/:landId").delete(adminlandcontroller.remove);

// admin controle over user

module.exports = router;
