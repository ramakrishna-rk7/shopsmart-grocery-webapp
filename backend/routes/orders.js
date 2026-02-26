const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// POST /api/orders – place an order
router.post('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const cart = user.cart || [];
        if (cart.length === 0)
            return res.status(400).json({ message: 'Cart is empty' });

        const items = cart.map((i) => ({
            product: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
        }));

        const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount,
            shippingAddress: req.body.shippingAddress || user.address || {},
        });

        // Clear cart after order
        user.cart = [];
        await user.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/orders/user – current user's orders
router.get('/user', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/orders/admin – all orders (admin)
router.get('/admin', protect, adminOnly, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/orders/:id/status – update order status (admin)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
