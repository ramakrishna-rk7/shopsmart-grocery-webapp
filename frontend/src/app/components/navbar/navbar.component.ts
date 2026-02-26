import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/models';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
    currentUser: User | null = null;
    cartCount = 0;
    private subs: Subscription[] = [];

    constructor(public authService: AuthService, public cartService: CartService, private router: Router) { }

    ngOnInit(): void {
        this.subs.push(
            this.authService.currentUser$.subscribe(user => {
                this.currentUser = user;
                if (user) this.cartService.loadCart();
                else this.cartService.clearLocal();
            }),
            this.cartService.cart$.subscribe(items => {
                this.cartCount = items.reduce((s, i) => s + i.quantity, 0);
            })
        );
    }

    logout(): void {
        this.authService.logout();
        this.cartService.clearLocal();
        this.router.navigate(['/']);
    }

    ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }
}
