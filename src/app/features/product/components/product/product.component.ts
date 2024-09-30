import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Product } from '../../models/product';
import { SqlInjectionPreventDirective } from '@shared/directives/sql-injection-prevent.directive';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FocusInvalidInputDirective } from '@shared/directives/focus-invalid-input.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet, SqlInjectionPreventDirective, ReactiveFormsModule, FocusInvalidInputDirective, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  name = 'product';
  // formControl: FormControl = new FormControl('');
  formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
  });
  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      console.error(data);
      // do something with your resolved data ...
    });
  }
  test(form: any) {
    console.error(form);
  }
}
