const router = require('express').Router();
const authController = require('../controller/authController')
const multer = require('multer');
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
 });
 const upload = multer({ storage: storage })

 router.post('/register', upload.none(), authController.register)
 router.post('/login', authController.login)
 router.post('/change-password/:id', authController.resetPassword)
 router.post('/logout', authController.logout)

module.exports = router