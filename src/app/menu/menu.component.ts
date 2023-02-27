import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy, OnInit {
  public isLoggedIn$: Observable<boolean | undefined>;
  public readonly routerLinks$: Observable<string[] | undefined>;
  public readonly toggleControl: FormControl<boolean | null> = new FormControl<boolean>(true);
  private readonly subscriptions: Subscription[] = [];

  constructor(protected readonly menuService: MenuService) {
    this.routerLinks$ = this.menuService.getRouterLinksFromStore$();
    this.isLoggedIn$ = this.menuService.getIsLoggedInFromStore$();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.menuService.getToggleControlValueChangesSubscription(this.toggleControl)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscriptions: Subscription) => subscriptions.unsubscribe());
  }
}
