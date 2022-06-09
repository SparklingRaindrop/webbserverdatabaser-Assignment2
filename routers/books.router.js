const express = require('express');
const controller = require('../controllers/books.controller');

const router = express.Router();

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBook);
router.post('/', controller.addBook);
router.put('/:id', controller.updateBook);
router.patch('/:id', controller.updateBook);
router.delete('/:id', controller.removeBook);

module.exports = router;