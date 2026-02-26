import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/models';

@Component({ selector: 'app-admin-orders', templateUrl: './admin-orders.component.html' })
export class AdminOrdersComponent implements OnInit {
    orders: Order[] = [];
    loading = true;
    statuses = ['placed', 'processing', 'shipped', 'delivered', 'cancelled'];

    constructor(private orderService: OrderService) { }

    ngOnInit(): void { this.load(); }

    load(): void {
        this.loading = true;
        this.orderService.getAdminOrders().subscribe({
            next: o => { this.orders = o; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    updateStatus(id: string, status: string): void {
        this.orderService.updateOrderStatus(id, status).subscribe(() => this.load());
    }
}
