import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/models';

@Component({ selector: 'app-product-detail', templateUrl: './product-detail.component.html' })
export class ProductDetailComponent implements OnInit {
    product: Product | null = null;
    loading = true;
    quantity = 1;
    added = false;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        public cartService: CartService,
        public authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')!;
        this.productService.getById(id).subscribe({
            next: p => { this.product = p; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    changeQty(delta: number): void {
        this.quantity = Math.max(1, this.quantity + delta);
    }

    addToCart(): void {
        if (!this.authService.isLoggedIn) { this.router.navigate(['/login']); return; }
        this.cartService.addToCart(this.product!._id, this.quantity).subscribe(() => {
            this.added = true;
            setTimeout(() => this.added = false, 1500);
        });
    }
}
