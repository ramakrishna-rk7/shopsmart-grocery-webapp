import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/models';

@Component({ selector: 'app-products', templateUrl: './products.component.html' })
export class ProductsComponent implements OnInit {
    products: Product[] = [];
    loading = true;
    search = '';
    selectedCategory = 'All';
    categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Meat'];
    addedId = '';
    private searchSubject = new Subject<string>();

    constructor(
        private productService: ProductService,
        public cartService: CartService,
        public authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(p => {
            if (p['category']) { this.selectedCategory = p['category']; }
            this.load();
        });
        this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => this.load());
    }

    load(): void {
        this.loading = true;
        this.productService.getAll(this.search, this.selectedCategory).subscribe({
            next: p => { this.products = p; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    onSearch(): void { this.searchSubject.next(this.search); }
    filterByCategory(cat: string): void { this.selectedCategory = cat; this.load(); }

    addToCart(p: Product): void {
        if (!this.authService.isLoggedIn) { this.router.navigate(['/login']); return; }
        this.addedId = p._id;
        this.cartService.addToCart(p._id).subscribe(() => { setTimeout(() => this.addedId = '', 1200); });
    }
}
