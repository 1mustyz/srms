const passport = require('passport');
const Auth = require('../models/Auth');
const multer = require('multer');
const {singleUpload} = require('../middlewares/filesMiddleware');
// const connectEnsureLogin = require('connect-ensure-login')

exports.register = async function (req, res, next) {
  try {
    //create the user instance
    user = new Auth(req.body)
    const password = req.body.password ? req.body.password : 'password'
    //save the user to the DB
    Auth.register(user, password, function (error, user) {
      if (error) return res.json({ success: false, error }) 
      res.json({ success: true, user })
    })
  } catch (error) {
    res.json({ success: false, error })
  }
}

exports.login = (req, res, next) => {

  // perform authentication
  passport.authenticate('local', (error, user, info) => {
    if (error) return res.json({ success: false, error })
    if (!user)
      return res.json({
        success: false,
        message: 'username or password is incorrect'
      })
    //login the user  
    req.login(user, (error) => {
      if (error)
        res.json({ success: false, message: 'something went wrong pls try again' })
      req.session.user = user
      res.json({ success: true, message: 'login successful', user })
    })
  })(req, res, next)
}

exports.logout = function (req, res, next) {
  req.logout()
  //redirect to login page
  res.json({ success: true, message: req.params.id })
}

exports.resetPassword = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.params.id)
    await user.changePassword(req.body.oldPassword, req.body.newPassword)
    await user.save()
    res.json({user})
  } catch (error) {
      res.json({ message: 'something went wrong', error })
  }

}

exports.setProfilePic = async (req,res, next) => {

  singleUpload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
    return res.json(err.message);
    }
    else if (err) {
      return res.json(err);
    }
    else if (!req.file) {
      return res.json({"image": req.file, "msg":'Please select an image to upload'});
    }
    if(req.file){
console.log(req.query.id)
        await Auth.findOneAndUpdate({_id: req.query.id},{$set: {image: req.file.path}})
        return  res.json({success: true,
         message: 'profile picture updated successfully',
                   },
        
    );
    }
    });          
  
}

exports.setRole = async (req,res,next) => {
  const {role,teach} = req.body;

  // req.session.user._id
  await Auth.findByIdAndUpdate(req.query.id,{$set: {role: role}})

  role == "teacher" || role.includes('teacher')
   ? await Auth.findByIdAndUpdate(req.query.id, {$set: {"teach":teach}, upsert: true, multi: false})
   : ''

   res.json({success: true, message: 'role has been set successfully'})
}

exports.findAllStaff = async (req,res, next) => {

  const result = await Auth.find({role: {$ne: 'student'}});
  result
   ? res.json({success: true, message: result,})
   : res.json({success: false, message: 'no user added yet',})
}

exports.findAllStudents = async (req,res, next) => {

  const result = await Auth.find({role: 'student'});
  result.length > 0
   ? res.json({success: true, message: result,})
   : res.json({success: false, message: 'no student added yet',})
}

exports.findAllTeachers = async (req,res, next) => {

  const result = await Auth.find({role: 'teacher'});
  result.length > 0
   ? res.json({success: true, message: result,})
   : res.json({success: false, message: 'no teachers added yet',})
}

exports.findAllPrincipal = async (req,res, next) => {

  const result = await Auth.find({role: 'principal'});
  result.length > 0
   ? res.json({success: true, message: result,})
   : res.json({success: false, message: 'no principal added yet',})
}