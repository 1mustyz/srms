const Auth = require('../models/Auth');

exports.getTeachersProfile = async (req,res,next) => {

    // TODO: change to seesion id
    const {id} = req.query
    const result = await Auth.findById(id);

    result
     ? res.json({success: true, message: result})
     : res.json({success: false, message: 'not registered'});
}

// TODO: get all student belonging to the class he takes