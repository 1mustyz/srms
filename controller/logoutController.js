exports.logout = function (req, res, next) {
  req.logout()
  //redirect to login page
  res.json({ success: true, message: 'logged out succesful' })
}