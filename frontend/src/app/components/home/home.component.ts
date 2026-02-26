import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/models';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    featuredProducts: Product[] = [];
    categories = ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks'];
    addedId = '';

    features = [
        { icon: '🚚', title: 'Free Delivery', desc: 'Free delivery on orders above ₹499' },
        { icon: '🌿', title: '100% Fresh', desc: 'Farm-fresh products guaranteed daily' },
        { icon: '🔒', title: 'Secure Payment', desc: 'SSL encrypted safe checkout' },
        { icon: '↩️', title: 'Easy Returns', desc: 'Hassle-free returns within 24h' },
    ];

    constructor(
        private productService: ProductService,
        public cartService: CartService,
        public authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.productService.getAll().subscribe(products => {
            this.featuredProducts = products.slice(0, 8);
        });
    }

    addToCart(product: Product): void {
        if (!this.authService.isLoggedIn) { this.router.navigate(['/login']); return; }
        this.addedId = product._id;
        this.cartService.addToCart(product._id).subscribe(() => {
            setTimeout(() => this.addedId = '', 1200);
        });
    }

    catEmoji(cat: string): string {
        const map: Record<string, string> = {
            Fruits: '🍎', Vegetables: '🥦', Dairy: '🥛', Bakery: '🍞',
            Beverages: '🥤', Snacks: '🍿', Meat: '🥩'
        };
        return map[cat] || '🛒';
    }

    goToCategory(cat: string): void {
        this.router.navigate(['/products'], { queryParams: { category: cat } });
    }
}
