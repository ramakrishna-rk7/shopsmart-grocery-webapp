import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    form: FormGroup;
    loading = false;
    error = '';
    showPass = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private cartService: CartService,
        private router: Router
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    submit(): void {
        if (this.form.invalid) return;
        this.loading = true; this.error = '';
        const { email, password } = this.form.value;
        this.authService.login(email, password).subscribe({
            next: () => {
                this.cartService.loadCart();
                this.router.navigate(['/']);
            },
            error: err => {
                this.error = err.error?.message || 'Login failed';
                this.loading = false;
            }
        });
    }
}
