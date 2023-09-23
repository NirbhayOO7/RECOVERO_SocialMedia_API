const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controller/postController');

router.post('/create', passport.authenticate('jwt', {session: false}), postController.create);
router.delete('/destroy/:id',passport.authenticate('jwt', {session: false}), postController.destroy);

module.exports = router;