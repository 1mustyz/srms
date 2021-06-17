const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurriculumSchema = new Schema({
    class: {
        number: Number,
        subject: Array
    }
});


const Curriculum = mongoose.model('curriculum', CurriculumSchema);

module.exports = Curriculum;