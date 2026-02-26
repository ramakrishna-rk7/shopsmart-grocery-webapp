const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shopsmart';

const products = [
    // Fruits
    { name: 'Red Apple', price: 40, category: 'Fruits', description: 'Fresh crispy red apples, rich in antioxidants.', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400', stockQuantity: 100, unit: 'kg' },
    { name: 'Banana', price: 25, category: 'Fruits', description: 'Ripe organic bananas, energy-boosting snack.', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', stockQuantity: 150, unit: 'dozen' },
    { name: 'Sweet Mango', price: 80, category: 'Fruits', description: 'Juicy Alphonso mangoes, king of fruits.', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400', stockQuantity: 60, unit: 'kg' },
    { name: 'Orange', price: 55, category: 'Fruits', description: 'Vitamin-C rich navel oranges.', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400', stockQuantity: 80, unit: 'kg' },
    // Vegetables
    { name: 'Tomato', price: 30, category: 'Vegetables', description: 'Farm-fresh hybrid tomatoes.', image: 'https://images.unsplash.com/photo-1561136594-7f68813d8077?w=400', stockQuantity: 120, unit: 'kg' },
    { name: 'Onion', price: 20, category: 'Vegetables', description: 'Red onions, perfect for Indian cooking.', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400', stockQuantity: 200, unit: 'kg' },
    { name: 'Spinach', price: 18, category: 'Vegetables', description: 'Tender baby spinach leaves.', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', stockQuantity: 70, unit: 'bunch' },
    { name: 'Carrot', price: 35, category: 'Vegetables', description: 'Crunchy organic carrots packed with beta-carotene.', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400', stockQuantity: 90, unit: 'kg' },
    // Dairy
    { name: 'Full Cream Milk', price: 60, category: 'Dairy', description: 'Fresh pasteurized full cream milk (1L).', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', stockQuantity: 200, unit: 'litre' },
    { name: 'Paneer', price: 95, category: 'Dairy', description: 'Soft fresh homestyle cottage cheese.', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', stockQuantity: 50, unit: '200g' },
    { name: 'Curd', price: 40, category: 'Dairy', description: 'Thick set natural curd (500g).', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', stockQuantity: 80, unit: '500g' },
    { name: 'Butter', price: 55, category: 'Dairy', description: 'Creamy unsalted white butter (100g).', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400', stockQuantity: 60, unit: '100g' },
    // Bakery
    { name: 'Whole Wheat Bread', price: 45, category: 'Bakery', description: 'Nutritious whole wheat sandwich bread.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', stockQuantity: 40, unit: 'loaf' },
    { name: 'Croissant', price: 35, category: 'Bakery', description: 'Buttery flaky French croissant.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', stockQuantity: 30, unit: 'piece' },
    { name: 'Cookies Pack', price: 70, category: 'Bakery', description: 'Assorted chocolate chip cookies pack.', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', stockQuantity: 100, unit: 'pack' },
    // Beverages
    { name: 'Orange Juice', price: 85, category: 'Beverages', description: '100% cold-pressed orange juice (1L).', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', stockQuantity: 50, unit: 'litre' },
    { name: 'Green Tea', price: 120, category: 'Beverages', description: 'Premium Darjeeling green tea bags (25 pack).', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', stockQuantity: 75, unit: 'pack' },
    { name: 'Mineral Water', price: 20, category: 'Beverages', description: 'Pure natural mineral water (1L bottle).', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400', stockQuantity: 300, unit: 'bottle' },
    // Snacks
    { name: 'Mixed Nuts', price: 180, category: 'Snacks', description: 'Premium roasted mixed nuts assortment.', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400', stockQuantity: 60, unit: '250g' },
    { name: 'Potato Chips', price: 30, category: 'Snacks', description: 'Crispy salted potato chips (100g).', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', stockQuantity: 120, unit: 'pack' },
];

const adminUser = {
    name: 'Admin User',
    email: 'admin@shopsmart.com',
    password: 'Admin@123',
    role: 'admin',
};

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await User.deleteMany({ role: 'admin' });

    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);

    const hashed = await bcrypt.hash(adminUser.password, 12);
    await User.create({ ...adminUser, password: hashed });
    console.log('✅ Admin user created: admin@shopsmart.com / Admin@123');

    await mongoose.disconnect();
    console.log('Done!');
}

seed().catch((err) => { console.error(err); process.exit(1); });
