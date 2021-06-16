const router = require('express').Router();
const authController = require('../controller/authController')


 router.post('/register', authController.register)
 router.post('/login', authController.login)
 router.post('/change-password/:id', authController.resetPassword)
 router.post('/logout', authController.logout)

 router.put('/set-profile-pic', authController.setProfilePic);
 router.put('/set-role', authController.setRole);

 router.get('/get-all-student', authController.findAllStudents);
 router.get('/get-all-teachers', authController.findAllTeachers);
 router.get('/get-all-principal', authController.findAllPrincipal);
 router.get('/get-all-staff', authController.findAllStaff);


module.exports = router