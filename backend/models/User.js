const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true, minlength: 6 },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        address: {
            street: String,
            city: String,
            state: String,
            pincode: String,
        },
        cart: [cartItemSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
