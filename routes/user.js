const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

// users routes 
router.post('/register', userController.create);
router.post('/login', userController.createSession);

module.exports = router;