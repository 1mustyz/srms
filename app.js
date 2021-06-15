const express = require('express')
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const passport = require('passport')
const expressSession = require('express-session')
const redis = require('redis')
const redisStore = require('connect-redis')(expressSession)
const redisClient = redis.createClient()
const sessionMiddleware = expressSession({
  secret: '[credentials.secret]',
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient }),
  saveUninitialized: false,
  resave: true
})
const Auth = require('./models/Auth')
const authRouter = require('./routes/authRoute')

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
passport.use(Auth.createStrategy())
passport.serializeUser(Auth.serializeUser())
passport.deserializeUser(Auth.deserializeUser())

app.use('/auth', authRouter)
