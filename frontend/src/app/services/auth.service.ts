import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiUrl;
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        const stored = localStorage.getItem('shopsmart_user');
        if (stored) this.currentUserSubject.next(JSON.parse(stored));
    }

    register(data: any): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, data).pipe(
            tap(user => this.setUser(user))
        );
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap(user => this.setUser(user))
        );
    }

    logout(): void {
        localStorage.removeItem('shopsmart_user');
        this.currentUserSubject.next(null);
    }

    private setUser(user: User): void {
        localStorage.setItem('shopsmart_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    get currentUser(): User | null { return this.currentUserSubject.value; }
    get token(): string | null { return this.currentUser?.token || null; }
    get isLoggedIn(): boolean { return !!this.currentUser; }
    get isAdmin(): boolean { return this.currentUser?.role === 'admin'; }
}
