const passport = require('passport')
const Auth = require('../models/Auth')
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
  res.json({ success: true, message: 'succesful' })
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
