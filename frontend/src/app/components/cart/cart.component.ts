import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/models';

@Component({ selector: 'app-cart', templateUrl: './cart.component.html' })
export class CartComponent implements OnInit {
    items: CartItem[] = [];
    loading = true;

    constructor(public cartService: CartService, public authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.cartService.loadCart();
        this.cartService.cart$.subscribe(items => { this.items = items; this.loading = false; });
    }

    remove(productId: string): void {
        this.cartService.removeFromCart(productId).subscribe();
    }

    updateQty(productId: string, quantity: number): void {
        if (quantity < 1) { this.remove(productId); return; }
        this.cartService.updateQuantity(productId, quantity).subscribe();
    }

    get total(): number { return this.cartService.cartTotal; }

    checkout(): void { this.router.navigate(['/checkout']); }
}
