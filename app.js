const express = require('express')
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3099
const passport = require('passport')
const expressSession = require('express-session')
// const redis = require('redis')
// const redisStore = require('connect-redis')(expressSession)
// const redisClient = redis.createClient()
const sessionMiddleware = expressSession({
  secret: '[credentials.secret]',
  // store: new redisStore({ host: 'localhost', port: 6379, client: redisClient }),
  saveUninitialized: false,
  resave: true
})
const Staff = require('./models/Staff')
const Student = require('./models/Student')
const studentRouter = require('./routes/studentRoute')
const staffRouter = require('./routes/staffRoute')

// //connect to db
mongoose.connect('mongodb://localhost/srms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
mongoose.Promise = global.Promise

// test DB connection
mongoose.connection
  .once('open', () => {
    console.log('mongodb started')
    // connect the server if DB is UP
    http.listen(PORT, () => {
      console.log(`server started at port ${PORT}`)
    })
  })
  .on('error', (error) => {
    console.log('error occured:', error)
  })

// set middlewares for static files and parsing data from forms or API
app.use(express.static('public'))
app.use(express.json())
app.use(sessionMiddleware)

// passport setup
app.use(passport.initialize())
app.use(passport.session())

passport.use('staff', Staff.createStrategy())
passport.use('student', Student.createStrategy())

passport.serializeUser(Staff.serializeUser())
passport.serializeUser(Student.serializeUser())
passport.deserializeUser(Staff.deserializeUser())
passport.deserializeUser(Student.deserializeUser())

app.use('/staff', staffRouter)
app.use('/student', studentRouter)
