import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState  } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  public readonly isHandset$: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map((result: BreakpointState) => result.matches),
        shareReplay<boolean>()
      );
  }
}
