import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer style="background:var(--bg-card);border-top:1px solid var(--border);padding:40px 0 24px;">
      <div class="container">
        <div class="row g-4 mb-4">
          <div class="col-12 col-md-4">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span style="width:32px;height:32px;background:linear-gradient(135deg,var(--primary),var(--primary-light));border-radius:8px;display:flex;align-items:center;justify-content:center;">
                <i class="fas fa-shopping-basket text-white" style="font-size:14px;"></i>
              </span>
              <span style="font-size:1.2rem;font-weight:800;background:linear-gradient(135deg,var(--primary-light),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;">ShopSmart</span>
            </div>
            <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.6;">Your trusted online grocery store. Fresh products delivered to your doorstep every day.</p>
          </div>
          <div class="col-6 col-md-2">
            <h6 style="font-weight:700;margin-bottom:16px;color:var(--primary-light);">Shop</h6>
            <div class="d-flex flex-column gap-2">
              <a routerLink="/products" style="color:var(--text-muted);font-size:0.9rem;">All Products</a>
              <a routerLink="/products" style="color:var(--text-muted);font-size:0.9rem;">Fruits</a>
              <a routerLink="/products" style="color:var(--text-muted);font-size:0.9rem;">Vegetables</a>
              <a routerLink="/products" style="color:var(--text-muted);font-size:0.9rem;">Dairy</a>
            </div>
          </div>
          <div class="col-6 col-md-2">
            <h6 style="font-weight:700;margin-bottom:16px;color:var(--primary-light);">Account</h6>
            <div class="d-flex flex-column gap-2">
              <a routerLink="/login" style="color:var(--text-muted);font-size:0.9rem;">Login</a>
              <a routerLink="/register" style="color:var(--text-muted);font-size:0.9rem;">Register</a>
              <a routerLink="/orders" style="color:var(--text-muted);font-size:0.9rem;">My Orders</a>
              <a routerLink="/cart" style="color:var(--text-muted);font-size:0.9rem;">Cart</a>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <h6 style="font-weight:700;margin-bottom:16px;color:var(--primary-light);">Contact</h6>
            <div class="d-flex flex-column gap-2" style="color:var(--text-muted);font-size:0.9rem;">
              <span><i class="fas fa-envelope me-2" style="color:var(--primary-light);"></i>support&#64;shopsmart.com</span>
              <span><i class="fas fa-phone me-2" style="color:var(--primary-light);"></i>+91 98765 43210</span>
              <span><i class="fas fa-map-marker-alt me-2" style="color:var(--primary-light);"></i>Hyderabad, India</span>
            </div>
          </div>
        </div>
        <hr style="border-color:var(--border);">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <p style="color:var(--text-muted);font-size:0.85rem;margin:0;">&#169; 2024 ShopSmart. All rights reserved.</p>
          <div class="d-flex gap-3">
            <span *ngFor="let s of ['fa-facebook-f','fa-twitter','fa-instagram','fa-linkedin-in']">
              <i class="fab {{s}}" style="color:var(--text-muted);font-size:1rem;cursor:pointer;" ></i>
            </span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }
