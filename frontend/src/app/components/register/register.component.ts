import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    form: FormGroup;
    loading = false;
    error = '';
    showPass = false;

    constructor(private fb: FormBuilder, private authService: AuthService,
        private cartService: CartService, private router: Router) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            street: [''], city: [''], state: [''], pincode: ['']
        });
    }

    submit(): void {
        if (this.form.invalid) return;
        this.loading = true; this.error = '';
        const v = this.form.value;
        const payload = {
            name: v.name, email: v.email, password: v.password,
            address: { street: v.street, city: v.city, state: v.state, pincode: v.pincode }
        };
        this.authService.register(payload).subscribe({
            next: () => { this.cartService.loadCart(); this.router.navigate(['/']); },
            error: err => { this.error = err.error?.message || 'Registration failed'; this.loading = false; }
        });
    }
}
