import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { ProductComponent } from './product/components/product/product.component';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { SqlInjectionPreventDirective } from '@shared/directives/sql-injection-prevent.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, CurrencyPipe, ProductComponent, SafePipe, SqlInjectionPreventDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-project-template';
  http = inject(HttpClient);
  content = '<script>alert("XSS Attack!");</script>';
  test() {
    this.content = 'abcsadasdasd';
  }
  // products = toSignal(this.http.get<any[]>('https://fakestoreapsi.com/products'));
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
  }
}
