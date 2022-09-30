import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url): any {
    if (url != null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    else {
      return this.sanitizer.bypassSecurityTrustResourceUrl("about:blank")
    }

  }

}
