const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//create comment for a pet
router.post('/', withAuth, async (req, res) => {
	try {
		const newComment = await Comment.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newComment);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;