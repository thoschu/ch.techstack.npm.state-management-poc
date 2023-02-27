import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DetailsService } from './details.service';

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
    MatTableModule
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: []
})
export class DetailsComponent implements OnInit {
  public displayedColumns$!: Observable<string[]>;
  public periodicElements$!: Observable<PeriodicElement[]>;

  constructor(private readonly detailsService: DetailsService) {
    const periodicElements = this.detailsService.getPeriodicElements$();
    const displayedColumns = this.detailsService.getDisplayedColumns$();
  }

  ngOnInit(): void {
    this.periodicElements$ = this.detailsService.getPeriodicElements$();
    this.displayedColumns$ = this.detailsService.getDisplayedColumns$();
  }
}
