import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { isLoggedInSelector } from "../menu/menu.selectors";

@Injectable()
export class DetailsGuard implements CanActivate {
  private static readonly URL: string = 'login';

  constructor(
    private readonly store: Store,
    private readonly router: Router
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select<object, boolean>(isLoggedInSelector),
      tap(async (isLoggedIn: boolean) => {
        if(!isLoggedIn) {
          await this.router.navigateByUrl(DetailsGuard.URL);
        }
      })
    );
  }
}
