const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/products');
    const products = await Product.find().populate('user', 'name');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products for a specific user
router.get('/my-products', auth, async (req, res) => {
  console.log('GET /api/products/my-products');
  try {
    console.log('User in request:', req.user);
    const userId = req.query.user || req.user._id; // Prefer query param or fallback to token
    console.log('Fetching products for user:', userId);

    const products = await Product.find({ user: userId });
    console.log('Products found:', products.length);
    res.json(products);
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new product
router.post('/', auth, async (req, res) => {
  console.log('POST /api/products');
  try {
    const { name, description, price, stock, image, category } = req.body;
    console.log('Request body:', req.body);

    if (!name || !description || !price || !stock || !image || !category) {
      console.error('Validation failed: Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Authenticated user:', req.user);

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      image,
      category,
      user: req.user._id // Attach user ID from token
    });

    console.log('Saving product:', newProduct);

    const savedProduct = await newProduct.save();
    console.log('Product saved:', savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product
router.put('/:id', auth, async (req, res) => {
  console.log(`PUT /api/products/${req.params.id}`);
  try {
    const { name, description, price, stock, image, category } = req.body;
    console.log('Request body:', req.body);

    let product = await Product.findById(req.params.id);
    if (!product) {
      console.error('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      console.error('Unauthorized attempt to update product');
      return res.status(401).json({ message: 'Not authorized' });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, image, category },
      { new: true }
    );

    console.log('Product updated:', product);
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', auth, async (req, res) => {
  console.log(`DELETE /api/products/${req.params.id}`);
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.error('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      console.error('Unauthorized attempt to delete product');
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Product.findByIdAndDelete(req.params.id);
    console.log('Product deleted');
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
