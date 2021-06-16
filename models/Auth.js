const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//Schema design
const AuthSchema = new Schema({
    username: { type: String, required: true, unique: [ true, 'ID Number already exist' ] },
    image: { type: String, default: '1.jpg' },
    email: { type: String, required: true },
    role: { type: Array, default: 'student'},
    teach: { type: Array}
}, { timestamps: true });

//plugin passport-local-mongoose to enable password hashing and salting and other things
AuthSchema.plugin(passportLocalMongoose);

//connect the schema with user table
const Auth = mongoose.model('auth', AuthSchema);

//export the model 
module.exports = Auth;