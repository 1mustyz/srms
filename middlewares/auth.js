//check if user is logged in && the user is not trying to access unauthorised data
exports.isLoggedIn = function (role) {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === role) return next()
      res.redirect('/auth/login')
    }
  }