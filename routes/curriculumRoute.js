const router = require('express').Router();
const curriculumController = require('../controller/curriculumController');

router.post('/create', curriculumController.create);

router.get('/get-all', curriculumController.getAllCurriculum);
router.get('/get-single-curriculum', curriculumController.getSingleClassCurriculum);

router.put('/update-single-curriculum', curriculumController.updateSingleClassCurriculum);

router.delete('/delete-single-curriculum', curriculumController.deleteSingleCurriculum);



module.exports = router;