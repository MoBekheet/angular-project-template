import { Component, effect, inject, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { SqlInjectionPreventDirective } from '@shared/directives/sql-injection-prevent.directive';
import { FormsModule } from '@angular/forms';
import { NgbAlert, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { CheckConnectionService } from '@core/services/check-connection.service';
import { CryptoService } from '@shared/services/crypto.service';
import { StorageService } from '@shared/services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, CurrencyPipe, SafePipe, SqlInjectionPreventDirective, FormsModule, NgbAlert, JsonPipe, NgbInputDatepicker],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-project-template';
  http = inject(HttpClient);
  cryptoService = inject(CryptoService);
  storageService = inject(StorageService);
  checkConnectionService = inject(CheckConnectionService);
  // products = toSignal(this.http.get<any[]>('https://fakestoreapsi.com/products'));
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
    this.storageService.set('angular-project-template', 'angular-project-template');
    console.error(this.storageService.get('angular-project-template'));
  }
}
