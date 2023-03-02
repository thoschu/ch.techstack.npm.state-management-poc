import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeriodicElement } from './details.component';
import {ChartConfiguration} from "chart.js";

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
    return this.details$.pipe(map((details: Details) => details.displayedColumns));
  }

  public getPeriodicElements$(): Observable<PeriodicElement[]> {
    return this.details$.pipe(map((details: Details) => details.periodicElements));
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
}
