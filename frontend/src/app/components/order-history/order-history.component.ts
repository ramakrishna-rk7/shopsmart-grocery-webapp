import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/models';

@Component({ selector: 'app-order-history', templateUrl: './order-history.component.html' })
export class OrderHistoryComponent implements OnInit {
    orders: Order[] = [];
    loading = true;

    constructor(private orderService: OrderService) { }

    ngOnInit(): void {
        this.orderService.getUserOrders().subscribe({
            next: o => { this.orders = o; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    statusClass(status: string): string {
        return `status-${status}`;
    }
}
