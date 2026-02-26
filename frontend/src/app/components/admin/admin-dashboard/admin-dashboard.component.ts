import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';

@Component({ selector: 'app-admin-dashboard', templateUrl: './admin-dashboard.component.html' })
export class AdminDashboardComponent implements OnInit {
    productCount = 0;
    orderCount = 0;
    totalRevenue = 0;
    recentOrders: any[] = [];
    loading = true;

    constructor(
        private productService: ProductService,
        private orderService: OrderService,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.productService.getAll().subscribe(products => { this.productCount = products.length; });
        this.orderService.getAdminOrders().subscribe(orders => {
            this.orderCount = orders.length;
            this.totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
            this.recentOrders = orders.slice(0, 5);
            this.loading = false;
        });
    }
}
