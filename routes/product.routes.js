const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getProducts,
} = require('../controllers/product.controller');

router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.get('/', getProducts);

module.exports = router;
