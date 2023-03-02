import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule, TranslocoConfig
} from '@ngneat/transloco';
import { Injectable, isDevMode, NgModule } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private readonly http: HttpClient) {}

  public getTranslation(lang: string): Observable<Translation> {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig(TranslocoRootModule.TRANSLOCO_CONFIG)
    }, {
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader
    }
  ]
})
export class TranslocoRootModule {
  private static readonly TRANSLOCO_CONFIG: Partial<TranslocoConfig> = {
    availableLangs: ['en', 'de', 'es'],
    defaultLang: 'de',
    // Remove this option if your application doesn't support changing language in runtime.
    reRenderOnLangChange: true,
    prodMode: !isDevMode(),
  };
}
