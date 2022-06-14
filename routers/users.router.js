const express = require('express');
const controller = require('../controllers/users.controller');
const tokenChecker = require('../middlewares/tokenChecker');

const router = express.Router();

router.post('/lend', tokenChecker, controller.lendBook);
router.post('/return', tokenChecker, controller.returnBook);

module.exports = router;