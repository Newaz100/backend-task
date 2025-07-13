const Product = require('../models/product.model');
const Category = require('../models/category.model');
const generateCode = require('../utils/codeGenerator');

exports.createProduct = async (req, res) => {
  try {
    const { name, category: categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ error: 'Invalid category ID' });

    const productCode = generateCode(name);

    const exists = await Product.findOne({ productCode });
    if (exists) return res.status(409).json({ error: 'Duplicate product code. Try different name.' });

    const product = new Product({ ...req.body, productCode });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const allowed = ['status', 'description', 'discount'];
    const validUpdates = Object.keys(updates).filter(k => allowed.includes(k));

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (search) filter.name = new RegExp(search, 'i');

    const products = await Product.find(filter).populate('category');

    const result = products.map(p => ({
      ...p.toObject(),
      finalPrice: +(p.price * (1 - p.discount / 100)).toFixed(2),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
