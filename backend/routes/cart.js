const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

// Cart is stored inside User document as a simple array
// GET /api/cart
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).lean();
        res.json(user.cart || []);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/cart/add  { productId, quantity }
router.post('/add', protect, async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const user = await User.findById(req.user._id);
        const cart = user.cart || [];
        const idx = cart.findIndex((i) => i.productId.toString() === productId);

        if (idx > -1) {
            cart[idx].quantity += quantity;
        } else {
            cart.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity,
            });
        }

        user.cart = cart;
        await user.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/cart/remove  { productId }
router.post('/remove', protect, async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);
        user.cart = (user.cart || []).filter(
            (i) => i.productId.toString() !== productId
        );
        await user.save();
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/cart/update  { productId, quantity }
router.post('/update', protect, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user._id);
        const item = (user.cart || []).find(
            (i) => i.productId.toString() === productId
        );
        if (item) item.quantity = quantity;
        if (quantity <= 0) user.cart = user.cart.filter((i) => i.productId.toString() !== productId);
        await user.save();
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/cart/clear
router.post('/clear', protect, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { cart: [] });
        res.json([]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
