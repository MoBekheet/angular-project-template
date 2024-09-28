import { Directive, ElementRef, HostListener, inject, Renderer2, SecurityContext } from '@angular/core';
import { SqlInjectionGuardService } from '@core/services/sql-injection-guard.service';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: 'input, textarea, select',
  standalone: true,
})
export class SqlInjectionPreventDirective {
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);
  private sqlInjectionGuardService: SqlInjectionGuardService = inject(SqlInjectionGuardService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = this.el.nativeElement;
    const userInput = inputElement.value;

    // Validate input
    if (!this.sqlInjectionGuardService.validateInput(userInput)) {
      // Handle invalid input
      this.renderer.setProperty(inputElement, 'value', '');
      alert('Invalid input detected! SQL Injection keywords are not allowed.');
    } else {
      // Sanitize the input using DomSanitizer
      const sanitizedInput = this.sanitizer.sanitize(SecurityContext.HTML, userInput);
      this.renderer.setProperty(inputElement, 'value', sanitizedInput);
    }
  }
}
