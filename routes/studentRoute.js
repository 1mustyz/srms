const router = require('express').Router();
const studentController = require('../controller/studentController')
const logoutController = require('../controller/logoutController')
const { isLoggedIn } = require('../middlewares/auth');


 router.post('/register', studentController.registerStudent)
 router.post('/login', studentController.loginStudent)
 router.post('/change-password/:id', studentController.resetPassword)
 router.post('/logout', logoutController.logout)

//  router.put('/set-profile-pic', authController.setProfilePic);
//  router.put('/set-role', authController.setRole);


module.exports = router