import { Inject, Injectable, PLATFORM_ID, isDevMode, inject } from '@angular/core';
import { map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { AppConfig } from '@shared/models/app-config.config';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private config!: AppConfig;
  private readonly configFilePath: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Set the config file path based on the environment
    this.configFilePath = environment.production ? './configs/production.config.json' : './configs/development.config.json';
  }

  // Load the configuration file
  loadConfig() {
    return isPlatformBrowser(this.platformId)
      ? this.http.get<AppConfig>(this.configFilePath).pipe(map((config: AppConfig) => (this.config = config)))
      : of(null);
  }

  // Get a specific setting from the config
  getSetting(key: string) {
    return this.config ? this.config[key] : null;
  }
}
