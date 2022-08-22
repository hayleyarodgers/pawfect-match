const router = require('express').Router();
const { Pet, User } = require('../models');
const withAuth = require('../utils/auth');

//render homepage
router.get('/', async (req, res) => {
  res.render('homepage');
});

//render pets adoption page
router.get('/adoptpets', async (req, res) => {
  try {
    const petData = await Pet.findAll();
    if (!petData) {
      res.status(400).json({ message: 'can not find pet data' });
      return;
    }
    const pets = await petData.map(item => item.get({ plain: true }))
    res.render('adoptpets', {
      pets,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  
});

// this below get request might need to be updated (copied from class mini project)

//render dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/pets');
    return;
  }
  res.render('login');
});

//render signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
