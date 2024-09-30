import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
const tokenKey = '';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  public logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public get isLoggedIn(): boolean {
    return !!localStorage.getItem(tokenKey);
  }

  public get getToken(): string | null {
    return localStorage.getItem(tokenKey);
  }
}
