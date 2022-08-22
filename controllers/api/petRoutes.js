const router = require('express').Router();
const { Pet } = require('../../models/Pet');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPet = await Pet.create({
          ...req.body,
          user_id: req.session.user_id,
        });
    
        res.status(200).json(newPet);
      } catch (err) {
        res.status(400).json(err);
      }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const petData = await Pet.update(req.body,{
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if (!petData) {
            res.status(404).json({ message: 'No Pet found!' });
            return ;
        }
        res.status(200).json(petData)
    } catch (err) {
        res.status(500).json(err);
     }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const petData = await Pet.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!petData) {
            res.status(404).json({ message: 'No Pet found!' });
            return;
        }
        res.status(200).json(petData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
