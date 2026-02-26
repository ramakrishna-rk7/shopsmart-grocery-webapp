const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        category: {
            type: String,
            required: true,
            enum: ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Meat', 'Other'],
        },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
        stockQuantity: { type: Number, default: 0, min: 0 },
        unit: { type: String, default: 'piece' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
