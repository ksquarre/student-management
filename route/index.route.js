let router=require('express').Router();

const teacher= require('./teacher.route');

router.use('/teacher',teacher)

module.exports = router ;