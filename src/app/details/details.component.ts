import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DetailsService } from './details.service';
import { ChartConfiguration } from "chart.js";
import { NgChartsModule } from "ng2-charts";
import { Observable } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export type DetailsPayload = Record<any, any>;

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    NgChartsModule,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: []
})
export class DetailsComponent implements OnInit {
  public displayedColumns$!: Observable<string[]>;
  public periodicElements$!: Observable<PeriodicElement[]>;

  constructor(protected readonly detailsService: DetailsService) {
    const periodicElements = this.detailsService.getPeriodicElements$();
    const displayedColumns = this.detailsService.getDisplayedColumns$();
  }

  ngOnInit(): void {
    this.periodicElements$ = this.detailsService.getPeriodicElements$();
    this.displayedColumns$ = this.detailsService.getDisplayedColumns$();
  }
}
