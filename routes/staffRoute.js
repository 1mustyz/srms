const router = require('express').Router();
const staffController = require('../controller/staffController');
const logoutController = require('../controller/logoutController')
const { isLoggedIn } = require('../middlewares/auth');


 router.post('/register', staffController.registerStaff)
 router.post('/login', staffController.loginStaff)
 router.post('/change-password/:id', staffController.resetPassword)
 router.post('/logout', logoutController.logout)

//  router.put('/set-profile-pic', authController.setProfilePic);
//  router.put('/set-role', authController.setRole);

//  router.get('/get-all-student', authController.findAllStudents);
//  router.get('/get-all-teachers', authController.findAllTeachers);
//  router.get('/get-all-principal', authController.findAllPrincipal);
//  router.get('/get-all-staff', authController.findAllStaff);


module.exports = router