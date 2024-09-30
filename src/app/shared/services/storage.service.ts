import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private cryptoService: CryptoService = inject(CryptoService);

  // Inject the platform id to check if running in browser
  private platformId: Object = inject(PLATFORM_ID);

  // Function to save data in localStorage
  set(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const encryptedKey = this.cryptoService.hashKey(key);
      const encryptedValue = this.cryptoService.encrypt(value);
      localStorage.setItem(encryptedKey, encryptedValue);
    }
  }

  // Function to retrieve data from localStorage
  get(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const encryptedKey = this.cryptoService.hashKey(key);
      const encryptedValue = localStorage.getItem(encryptedKey);
      if (encryptedValue) {
        return this.cryptoService.decrypt(encryptedValue);
      }
    }
    return null;
  }

  // Function to update data in localStorage
  update(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const encryptedKey = this.cryptoService.hashKey(key);
      if (localStorage.getItem(encryptedKey)) {
        const encryptedValue = this.cryptoService.encrypt(value);
        localStorage.setItem(encryptedKey, encryptedValue); // Update the value
      } else {
        console.warn(`Key "${key}" does not exist. Use set() to create it first.`);
      }
    }
  }

  // Function to remove data from localStorage
  remove(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const encryptedKey = this.cryptoService.hashKey(key);
      localStorage.removeItem(encryptedKey);
    }
  }

  // Function to clear all data from localStorage
  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
