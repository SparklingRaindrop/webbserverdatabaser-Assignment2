const express = require('express');
const controller = require('../controllers/me.controller');

const tokenChecker = require('../middlewares/tokenChecker');

const router = express.Router();
router.post('/', tokenChecker, controller.getUserData);

module.exports = router;
