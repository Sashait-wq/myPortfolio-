import { inject, Injectable } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangController {
  private translate = inject(TranslateService);

  private _list: string[] = ['en', 'fr'];
  private _defaultLang = 'en';

  public get langList(): string[] {
    return this._list;
  }

  public get currentLang(): string {
    return this.translate.currentLang;
  }

  public get defaultLang(): string {
    return this._defaultLang;
  }

  public setLang(lang: string): void {
    this.translate.use(lang);
  }

  public getTranslate(key: string): string {
    let result: any;
    this.translate.get(key).subscribe((res) => {
      result = res;
    });
    return result;
  }

  public getTranslate$(key: any): Observable<string> {
    return this.translate.stream(_(key));
  }

  public init(): void {
    this.translate.setDefaultLang(this.translate.getBrowserLang() || this.defaultLang);
  }
}
