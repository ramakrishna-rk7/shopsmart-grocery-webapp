import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/models';

@Component({ selector: 'app-admin-products', templateUrl: './admin-products.component.html' })
export class AdminProductsComponent implements OnInit {
    products: Product[] = [];
    loading = true;
    form: FormGroup;
    editingId: string | null = null;
    showForm = false;
    submitting = false;
    success = '';
    error = '';
    deleteConfirmId = '';

    categories = ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Meat', 'Other'];

    constructor(private productService: ProductService, private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(1)]],
            category: ['', Validators.required],
            description: [''],
            image: [''],
            stockQuantity: [0, Validators.min(0)],
            unit: ['kg']
        });
    }

    ngOnInit(): void { this.load(); }

    load(): void {
        this.loading = true;
        this.productService.getAll().subscribe(p => { this.products = p; this.loading = false; });
    }

    openAdd(): void {
        this.editingId = null; this.form.reset({ unit: 'kg', stockQuantity: 0 }); this.showForm = true;
    }

    openEdit(p: Product): void {
        this.editingId = p._id;
        this.form.patchValue(p);
        this.showForm = true;
    }

    closeForm(): void { this.showForm = false; this.editingId = null; }

    submit(): void {
        if (this.form.invalid) return;
        this.submitting = true; this.error = '';
        const obs = this.editingId
            ? this.productService.update(this.editingId, this.form.value)
            : this.productService.create(this.form.value);

        obs.subscribe({
            next: () => {
                this.success = this.editingId ? 'Product updated!' : 'Product added!';
                this.submitting = false; this.closeForm(); this.load();
                setTimeout(() => this.success = '', 2000);
            },
            error: err => { this.error = err.error?.message || 'Failed'; this.submitting = false; }
        });
    }

    delete(id: string): void {
        this.productService.delete(id).subscribe(() => { this.load(); this.deleteConfirmId = ''; });
    }
}
