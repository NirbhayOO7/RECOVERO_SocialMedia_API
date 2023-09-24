const express = require('express');
const router = express.Router();
const passport = require('passport');
const likeController = require('../controller/likeController');

router.get('/toggle', passport.authenticate('jwt', {session: false}), likeController.toggleLike);

module.exports = router;