import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartItem } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CartService {
    private apiUrl = `${environment.apiUrl}/cart`;
    private cartSubject = new BehaviorSubject<CartItem[]>([]);
    public cart$ = this.cartSubject.asObservable();

    constructor(private http: HttpClient) { }

    loadCart(): void {
        this.http.get<CartItem[]>(this.apiUrl).subscribe({
            next: items => this.cartSubject.next(items),
            error: () => this.cartSubject.next([])
        });
    }

    addToCart(productId: string, quantity = 1): Observable<CartItem[]> {
        return this.http.post<CartItem[]>(`${this.apiUrl}/add`, { productId, quantity }).pipe(
            tap(items => this.cartSubject.next(items))
        );
    }

    removeFromCart(productId: string): Observable<CartItem[]> {
        return this.http.post<CartItem[]>(`${this.apiUrl}/remove`, { productId }).pipe(
            tap(items => this.cartSubject.next(items))
        );
    }

    updateQuantity(productId: string, quantity: number): Observable<CartItem[]> {
        return this.http.post<CartItem[]>(`${this.apiUrl}/update`, { productId, quantity }).pipe(
            tap(items => this.cartSubject.next(items))
        );
    }

    clearCart(): Observable<CartItem[]> {
        return this.http.post<CartItem[]>(`${this.apiUrl}/clear`, {}).pipe(
            tap(() => this.cartSubject.next([]))
        );
    }

    clearLocal(): void { this.cartSubject.next([]); }

    get cartCount(): number {
        return this.cartSubject.value.reduce((sum, i) => sum + i.quantity, 0);
    }

    get cartTotal(): number {
        return this.cartSubject.value.reduce((sum, i) => sum + i.price * i.quantity, 0);
    }

    get items(): CartItem[] { return this.cartSubject.value; }
}
