const express = require("express")

const router = express.Router();


const agentusercontroller = require('../controllers/agent/agent-controller')

const agentlandcontroller = require('../controllers/agent/land-controller')

const landcontroller = require('../controllers/land-controller')


// user
router.route('/all/user').get(agentusercontroller.getalluser);

router.route('/user/:userId').get(agentusercontroller.userDetails);

// router.route('/user').get(agentusercontroller.userDetails);

// router.route('/user/update/:userId').get(adminusercontroller.updateuser);

// router.route('/user/delete').delete(adminusercontroller.deleteuser);

// // land

router.route('/land/all').get(agentlandcontroller.getall);

router.route('/land/location').get(agentlandcontroller.getbylocation);

router.route('/land/unverified').get(agentlandcontroller.getunverified);

router.route('/land/verify').put(agentlandcontroller.verifyland);
// router.route('/land/:landId').get(adminlandcontroller.getland);

// router.route('/land/verify').get(adminlandcontroller.verifyland);

// router.route('/land/unverified').get(adminlandcontroller.getunverified);

// router.route('/land/update/').get(adminlandcontroller.update);

// router.route('/land/removeproperty/:landId').get(adminlandcontroller.remove);

// Mark property as contacted
router.route('/contact/:userId/:propertyId').put(agentlandcontroller.contacted);



module.exports = router