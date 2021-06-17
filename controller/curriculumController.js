const Curriculum = require('../models/Curriculum');


exports.create = async (req,res,next) => {
    await Curriculum.insertMany(req.body);
    res.json({success: true, message: 'curriculum have been added'});
}

exports.getAllCurriculum = async (req,res,next) => {
    const result = await Curriculum.find();

    result.length > 0
     ? res.json({success: true, message: result})
     : res.json({success: false, message: 'no curriculum added yet'})
}

exports.getSingleClassCurriculum = async (req,res,next) => {
    const {classNumber} = req.query; 
    const result = await Curriculum.findOne({'class.number': classNumber})
    result
     ? res.json({success: true, message: result})
     : res.json({success: false, message: `no curriculum added for class ${classNumber} yet`})
}

exports.updateSingleClassCurriculum = async (req,res,next) => {

    const {classNumber} = req.query; 
    await Curriculum.updateOne({'class.number': classNumber},{$set:{'class': req.body}})
    res.json({success: true, message: `curriculum for class ${classNumber} have updated added`});

}

exports.deleteSingleCurriculum = async (req,res,next) => {
    const {classNumber} = req.query; 
    await Curriculum.deleteOne({'class.number': req.query.classNumber})
    res.json({success: true, message: `curriculum for class ${req.query.classNumber} have updated added`});

}