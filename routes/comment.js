const express = require('express');
const passport = require('passport');
const router = express.Router();

const commentsController = require('../controller/commentController');

router.post('/create',passport.authenticate('jwt', {session: false}), commentsController.create);
router.delete('/destroy/:id', passport.authenticate('jwt', {session: false}), commentsController.destroy);

module.exports = router;