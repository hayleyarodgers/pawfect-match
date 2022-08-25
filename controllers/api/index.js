const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
