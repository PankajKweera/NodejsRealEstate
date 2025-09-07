const express = require('express')

const router = express.Router();

const landController = require('../controllers/land-controller')


// User
router.route('/all').get(landController.getall)

router.route('/all/location').get(landController.getbylocation)


// router.route('/register/property').post(landController.register)

// router.route('/register/property/update').put(landController.update)

// router.route('/register/property/remove').delete(landController.remove)

// Agent
// router.route('/agent/property/getall').get(landController.getunverified)

// router.route('/agent/property/verify').put(landController.verifyland)

// // Admin
// router.route('/admin/property/getalluser').get(landController.getalluser)

// router.route('/admin/property/getallland').get(landController.getallland)



module.exports = router