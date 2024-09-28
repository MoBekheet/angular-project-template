import { computed, Directive, HostListener, input, Optional } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Directive({
  selector: '[focusInvalidInput]',
  standalone: true,
})
export class FocusInvalidInputDirective {
  // Input for Reactive Forms
  formGroup = input<FormGroup>();

  // Inject NgForm for Template-Driven Forms
  constructor(@Optional() private ngForm: NgForm) {}

  @HostListener('submit', ['$event'])
  onFormSubmit(event: Event) {
    event.preventDefault();

    // Handle Template-Driven Forms
    if (this.ngForm) {
      const invalidControlTemplate = this.findInvalidControlTemplateDriven(this.ngForm);
      if (invalidControlTemplate) {
        const element = document.querySelector(`[name="${invalidControlTemplate}"]`);
        if (element) {
          (element as HTMLElement).focus();
        }
        return;
      }
    }

    // Handle Reactive Forms
    const getFormGroup = computed(() => this.formGroup());
    if (getFormGroup()) {
      const firstInvalidControl = this.findInvalidControl(getFormGroup()!);
      if (firstInvalidControl) {
        const element = document.querySelector(`[formControlName="${firstInvalidControl}"]`);
        if (element) {
          (element as HTMLElement).focus();
        }
      }
    }
  }

  // Find invalid control in Template-Driven Form
  private findInvalidControlTemplateDriven(ngForm: NgForm): string | null {
    const controls = ngForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        return name;
      }
    }
    return null;
  }

  // Find invalid control in Reactive Form
  private findInvalidControl(formGroup: FormGroup): string | null {
    const controls = formGroup.controls;
    for (const key in controls) {
      if (controls[key].invalid) {
        return key;
      }
    }
    return null;
  }
}
