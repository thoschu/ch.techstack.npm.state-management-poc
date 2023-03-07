import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export enum UserEnum {
  id = 'id',
  name = 'name',
  info = 'info'
}

export type User = Record<UserEnum, number | string>;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private static readonly LOCALHOST_LOGIN: string = 'http://localhost:3000/login';

  constructor(private readonly http: HttpClient) { }

  public login(name: string, password: string): Observable<User> | null {
    if(name == 'erce' && password == 'hallo1') {
      return this.http.get<User>(`${LoginService.LOCALHOST_LOGIN}/1`);
    } else if(name == 'tom' && password == 'hallo2') {
      return this.http.get<User>(`${LoginService.LOCALHOST_LOGIN}/2`);
    }

    return null;
  }
}
