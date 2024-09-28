import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

type Type = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

@Pipe({
  name: 'safe',
  standalone: true,
})
export class SafePipe implements PipeTransform {
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  transform(value: string, type: Type): SafeHtml | SafeUrl | SafeResourceUrl {
    const obj: { [key: string]: any } = {
      html: this.sanitizer.bypassSecurityTrustHtml(value),
      style: this.sanitizer.bypassSecurityTrustStyle(value),
      script: this.sanitizer.bypassSecurityTrustScript(value),
      url: this.sanitizer.bypassSecurityTrustUrl(value),
      resourceUrl: this.sanitizer.bypassSecurityTrustResourceUrl(value),
    };
    if (type in obj) return obj[type];

    throw new Error(`Invalid safe type specified: ${type}`);
  }
}
