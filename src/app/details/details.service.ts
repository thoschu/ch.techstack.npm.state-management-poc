import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ChartConfiguration } from 'chart.js';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import { PeriodicElement } from './details.component';

export type Details = Record<'periodicElements', PeriodicElement[]> & Record<'displayedColumns', string[]>;

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  public readonly barChartLegend = true;
  public readonly barChartPlugins = [];
  private readonly details$: Observable<Details>;

  constructor(private readonly httpClient: HttpClient) {
    this.details$ = this.httpClient.get<Details>('api/details');
  }

  public getDisplayedColumns$(): Observable<string[]> {
    return this.details$.pipe(
      retry(1),
      catchError(this.handleError),
      map((details: Details) => details.displayedColumns)
    );
  }

  public getPeriodicElements$(): Observable<PeriodicElement[]> {
    return this.details$.pipe(
      retry<Record<'periodicElements', PeriodicElement[]> & Record<'displayedColumns', string[]>>(1),
      catchError<Record<'periodicElements', PeriodicElement[]> & Record<'displayedColumns', string[]>, Observable<never>>(this.handleError),
      map<Details, PeriodicElement[]>((details: Details) => details.periodicElements)
    );
  }

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    layout: {padding: 20}
  };

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;

    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }
}
