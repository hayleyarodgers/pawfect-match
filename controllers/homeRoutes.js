const router = require('express').Router();
const { Pet, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//render homepage
router.get('/', async (req, res) => {
	let user = null;

	try
	{
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
		});

		user = userData.get({ plain: true });
	}  catch (err) {
		user = null;
	}
	
	res.render('homepage', {
		...user,
		logged_in: !!req.session.logged_in,
	});
});

//render the post for adoption page
router.get('/postforadoption', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
		});

		const user = userData.get({ plain: true });
		res.render('postForAdoption', {
			...user,
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//render pets adoption page
router.get('/adoptpet', withAuth, async (req, res) => {
	try {
		const petData = await Pet.findAll();
		if (!petData) {
			res.status(400).json({ message: 'can not find pet data' });
			return;
		}
		const pets = await petData.map((item) => item.get({ plain: true }));
		res.render('adoptpet', {
			pets,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//render cat list
router.get('/adoptpet/cat', withAuth, async (req, res) => {
	try {
		const catsData = await Pet.findAll({
			where: { type: 'cat' },
			include: [{ model: User }, { model: Comment }],
		});
		if (!catsData) {
			res.status(400).json({ message: 'can not find cat data' });
			return;
		}
		const cats = await catsData.map((item) => item.get({ plain: true }));
		res.render('catList', {
			cats,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//render each cat page
router.get('/adoptpet/cat/:id', withAuth, async (req, res) => {
	try {
		const catData = await Pet.findByPk(req.params.id, {
			attributes: { exclude: ['password'] },
			include: [
				{ model: User },
				{
					model: Comment,
					include: [User],
				},
			],
		});
		const cat = catData.get({ plain: true });

		res.render('cat', {
			...cat,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//render dog list
router.get('/adoptpet/dog', withAuth, async (req, res) => {
	try {
		const dogsData = await Pet.findAll({
			where: { type: 'dog' },
			include: [{ model: User }, { model: Comment }],
		});
		if (!dogsData) {
			res.status(400).json({ message: 'can not find cat data' });
			return;
		}
		const dogs = await dogsData.map((item) => item.get({ plain: true }));
		res.render('dogList', {
			dogs,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//render each dog page
router.get('/adoptpet/dog/:id', withAuth, async (req, res) => {
	try {
		const dogData = await Pet.findByPk(req.params.id, {
			attributes: { exclude: ['password'] },
			include: [
				{ model: User },
				{
					model: Comment,
					include: [User],
				},
			],
		});

		const dog = dogData.get({ plain: true });

		res.render('dog', {
			...dog,
			logged_in: req.session.logged_in,
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
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//render login page
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/adoptpet');
		return;
	}
	res.render('login');
});

module.exports = router;
