const express = require('express');
const controller = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', controller.addUser);
router.post('/login', controller.loginUser);

module.exports = router;