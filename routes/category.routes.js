const express = require('express');
const router = express.Router();
const { createCategory } = require('../controllers/category.controller');

router.post('/', createCategory);

module.exports = router;
