import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { SqlInjectionPreventDirective } from '@shared/directives/sql-injection-prevent.directive';
import { FormsModule } from '@angular/forms';
import { NgbAlert, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationService } from '@core/services/configuration.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, CurrencyPipe, SafePipe, SqlInjectionPreventDirective, FormsModule, NgbAlert, JsonPipe, NgbInputDatepicker],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-project-template';
  configurationService = inject(ConfigurationService);
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
  }

  ngOnInit(): void {
    console.error(this.translate.instant('HELLO'));
    console.error(this.configurationService.getSetting('projectName'));
  }
}
