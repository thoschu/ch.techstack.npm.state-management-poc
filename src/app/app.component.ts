import { Component } from '@angular/core';
import { count } from 'letter-count';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'state-management-poc';

  constructor() {
    const Log: (...data: any[]) => void = console.log;

    Log(count('-c',"Hamburg - \nGermany 137!"));
  }
}
