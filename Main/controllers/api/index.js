const router = require('express').Router();
const userRoutes = require('./userRoutes');
const catRoutes = require('./catRoutes');
const dogRoutes = require('./dogRoutes');

router.use('/users', userRoutes);
router.use('/cats', catRoutes);
router.use('/dogs', dogRoutes)

module.exports = router;
