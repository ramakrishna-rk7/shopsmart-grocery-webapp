import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-checkout', templateUrl: './checkout.component.html' })
export class CheckoutComponent implements OnInit {
    form: FormGroup;
    loading = false;
    error = '';
    items: any[] = [];
    total = 0;

    constructor(
        private fb: FormBuilder,
        private cartService: CartService,
        private orderService: OrderService,
        public authService: AuthService,
        private router: Router
    ) {
        const user = authService.currentUser;
        this.form = this.fb.group({
            street: [user?.address?.street || '', Validators.required],
            city: [user?.address?.city || '', Validators.required],
            state: [user?.address?.state || '', Validators.required],
            pincode: [user?.address?.pincode || '', Validators.required]
        });
    }

    ngOnInit(): void {
        this.cartService.cart$.subscribe(items => {
            this.items = items;
            this.total = this.cartService.cartTotal;
            if (items.length === 0) this.router.navigate(['/cart']);
        });
    }

    placeOrder(): void {
        if (this.form.invalid) { this.form.markAllAsTouched(); return; }
        this.loading = true; this.error = '';
        this.orderService.placeOrder(this.form.value).subscribe({
            next: () => { this.router.navigate(['/orders']); },
            error: err => { this.error = err.error?.message || 'Order failed'; this.loading = false; }
        });
    }
}
