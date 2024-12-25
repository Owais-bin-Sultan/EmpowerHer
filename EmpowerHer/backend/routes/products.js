const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'name');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  console.log('GET /api/products');
});

// Get user's products
router.get('/my-products', auth, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  console.log('GET /api/products');
});
//adding a new product
// Add a new product (no auth)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock, image, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !stock || !image || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      image,
      category,
      user: "64dcb0e8b68e5f001e2abcde" // Placeholder user ID
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Update a product
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, price, stock, image, category } = req.body;
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user owns the product
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.image = image;
    product.category = category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user owns the product
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;