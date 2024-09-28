import { Component, inject, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { ProductComponent } from './product/components/product/product.component';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { SqlInjectionPreventDirective } from '@shared/directives/sql-injection-prevent.directive';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { setTheme } from 'ngx-bootstrap/utils';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    CurrencyPipe,
    ProductComponent,
    SafePipe,
    SqlInjectionPreventDirective,
    FormsModule,
    BsDatepickerModule,
    PaginationModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [BsModalService],
})
export class AppComponent {
  title = 'angular-project-template';
  http = inject(HttpClient);
  modalRef?: BsModalRef;
  config = {
    animated: true,
  };
  // products = toSignal(this.http.get<any[]>('https://fakestoreapsi.com/products'));
  constructor(
    private translate: TranslateService,
    private modalService: BsModalService
  ) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
    setTheme('bs5');
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
