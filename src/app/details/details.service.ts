import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeriodicElement } from './details.component';

export type Details = Record<'periodicElements', PeriodicElement[]> & Record<'displayedColumns', string[]>;

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private readonly details$: Observable<Details>;

  constructor(private readonly httpClient: HttpClient) {
    this.details$ = this.httpClient.get<Details>('api/details');
  }

  public getDisplayedColumns$(): Observable<string[]> {
    return this.details$.pipe(map((details: Details) => details.displayedColumns));
  }

  public getPeriodicElements$(): Observable<PeriodicElement[]> {
    return this.details$.pipe(map((details: Details) => details.periodicElements));
  }
}
