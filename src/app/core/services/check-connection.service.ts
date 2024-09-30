import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CheckConnectionService {
  // private onlineStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(navigator.onLine);
  private onlineStatusSubject = signal(true); // Default to true

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      // Only execute this in the browser environment
      this.onlineStatusSubject.set(navigator.onLine);

      // Listen to online event
      window.addEventListener('online', () => this.updateOnlineStatus(true));

      // Listen to offline event
      window.addEventListener('offline', () => this.updateOnlineStatus(false));
    }
  }

  // Getter for the online status as a computed
  get onlineStatus(): boolean {
    return this.onlineStatusSubject();
  }

  // Method to update the online status
  private updateOnlineStatus(status: boolean): void {
    this.onlineStatusSubject.set(status);
  }
}
