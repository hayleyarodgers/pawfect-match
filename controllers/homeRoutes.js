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

//render cat list
router.get('/adoptpets/cat', async (req, res) => {
  try {
    const catsData = await Pet.findAll({ where: { type: 'cat' } });
    if (!catsData) {
      res.status(400).json({ message: 'can not find cat data' });
      return;
    }
    const cats = await catsData.map(item => item.get({ plain: true }))
    res.render('catList', {
      cats,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render each cat page
router.get('/adoptpets/cat/:id', async (req, res) => {
  try {
    const catData = await Pet.findByPk(req.params.id,
      {
        attributes: { exclude: ['password'] },
        include: [{ model: User }],
      }
    );
    const cat = catData.get({ plain: true });

    res.render('cat', {
      ...cat,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render dog list
router.get('/adoptpets/dog', async (req, res) => {
  try {
    const dogsData = await Pet.findAll({ where: { type: 'dog' } });
    if (!dogsData) {
      res.status(400).json({ message: 'can not find cat data' });
      return;
    }
    const dogs = await dogsData.map(item => item.get({ plain: true }))
    res.render('dogList', {
      dogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render each dog page
router.get('/adoptpets/dog/:id', async (req, res) => {
  try {
    const dogData = await Pet.findByPk(req.params.id,
      {
        attributes: { exclude: ['password'] },
        include: [{ model: User }],
      }
    );
    const dog = dogData.get({ plain: true });

    res.render('dog', {
      ...dog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
