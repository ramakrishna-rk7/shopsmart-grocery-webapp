export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    token?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        pincode?: string;
    };
}

export interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
    stockQuantity: number;
    unit: string;
}

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface OrderItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    _id: string;
    user: any;
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: {
        street?: string;
        city?: string;
        state?: string;
        pincode?: string;
    };
    paymentStatus: 'pending' | 'paid' | 'failed';
    orderStatus: 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
}
