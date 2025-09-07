const express = require("express")

const router = express.Router();

const otpcontroller = require('../controllers/otp-controller')

const authcontroller = require('../controllers/auth-controller')


// Registers a new user and send otp.
router.route('/user/generateotp').get(otpcontroller.userotpCreation);
router.route('/agent/generateotp').get(otpcontroller.agentotpCreation);
router.route('/admin/generateotp').get(otpcontroller.adminotpCreation);

// verify the user using OTP
router.route('/user/login').get(authcontroller.register);
router.route('/agent/login').get(authcontroller.agentregister);
router.route('/admin/login').get(authcontroller.adminregister);


// // Firebase auth genrate otp
// router.route('/user/generateotp').get(otpcontroller.userotpCreation);

module.exports = router;