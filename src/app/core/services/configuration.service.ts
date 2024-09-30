import { Inject, Injectable, PLATFORM_ID, isDevMode } from '@angular/core';
import { map, Observable } from 'rxjs';
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
  loadConfig(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<AppConfig>(this.configFilePath).pipe(
        map((config: AppConfig) => {
          this.config = config;
          console.error({ config });
          return this.config;
        })
      );
    }
    return new Observable(observer => {
      observer.next(null);
      observer.complete();
    });
  }

  // Get a specific setting from the config
  getSetting(key: string) {
    return this.config ? this.config[key] : null;
  }
}
