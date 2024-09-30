import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private storageService = inject(StorageService);

  public logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public get isLoggedIn(): boolean {
    return !!this.storageService.get('authToken');
  }

  public get getToken(): string | null {
    return this.storageService.get('authToken');
  }
}
