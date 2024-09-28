import { inject, Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private cryptoService: CryptoService = inject(CryptoService);

  // Function to save data in localStorage
  setItem(key: string, value: string): void {
    const encryptedValue = this.cryptoService.encrypt(value);
    localStorage.setItem(key, encryptedValue);
  }

  // Function to retrieve data from localStorage
  getItem(key: string): string | null {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      return this.cryptoService.decrypt(encryptedValue);
    }
    return null;
  }

  // Function to remove data from localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Function to clear all data from localStorage
  clear(): void {
    localStorage.clear();
  }
}
