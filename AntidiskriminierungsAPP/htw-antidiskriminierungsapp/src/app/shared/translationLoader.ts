import { TranslateLoader } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MehrsprachigkeitEntry } from './mehrsprachigkeit';

@Injectable()
export class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get<MehrsprachigkeitEntry[]>(`http://localhost:3000/mehrsprachigkeit/sprache/${lang}`)
      .pipe(
        map((entries) => {
          const result: Record<string, string> = {};
          entries.forEach(entry => {
            result[entry.id] = entry.text;
          });
          return result;
        })
      );
  }
}
