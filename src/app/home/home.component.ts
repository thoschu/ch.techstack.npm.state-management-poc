import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import jss, {CreateGenerateId, InsertionPoint, Rule, Styles, StyleSheet} from 'jss';
import preset from 'jss-preset-default';
import { nanoid } from 'nanoid';
import { ApexChart, ApexAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { applyTo, assocPath } from 'ramda';
import {BehaviorSubject, of, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

type StyleKeys = 'button' | 'container' | 'content';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  private styleTerm$ = new BehaviorSubject<string>('');
  private readonly cssNanoId: string;
  private counter: number;
  protected sheet!: StyleSheet<StyleKeys>;
  protected chart: ApexChart = { type: 'line' };
  protected series: ApexAxisChartSeries = [{
    name: 'sales',
    data: [30,40,35,50,49,60,70,91,125]
  }];
  protected readonly title: ApexTitleSubtitle = { text: 'Test for Marc' };

  @ViewChild('dragA') private readonly dragOne!: ElementRef<HTMLDivElement>;
  @ViewChild('dragB') private readonly dragTwo!: ElementRef<HTMLDivElement>;
  @ViewChild('content') private readonly content!: ElementRef<InsertionPoint>;

  private styles: Record<StyleKeys, any> = {
    button: {
      color: 'black'
    },
    container: {
      '&:hover': {
        background: 'transparent'
      },
      color: 'red'
    },
    content: {
      background: 'transparent'
    }
  };

  // https://github.com/cssinjs/examples/blob/gh-pages/inline/app.js

  constructor(private readonly renderer2: Renderer2, private readonly httpClient: HttpClient) {
    this.counter = 0;
    this.cssNanoId = nanoid(5);

    // this.reduceDefaultStyles(['container', '&:hover', 'background'], 'olive');

    //
    // const container$ = this.styleTerm$.pipe(
    //   tap((term: any) => console.log(term)),
    //   switchMap((term: any) => {
    //     const addr: string = `http://localhost:3000/login/${term}`;
    //
    //     return this.httpClient.get(addr);
    //   })
    // );
    //
    // container$.subscribe((data: any) => {
    //   console.log(data);
    //   // this.sheet.update(data);
    // });
    //
    // this.styleTerm$.next('2');





  }

  ngAfterViewInit(): void {
    const insertionPoint: InsertionPoint = this.content.nativeElement;

    jss.setup({ insertionPoint });
    jss.setup(preset());

    const createGenerateId: () => (rule: Rule, sheet: StyleSheet) => string = () => {
      return (rule: Rule, _sheet: StyleSheet) => {
        return `${this.cssNanoId}-${rule.key}-${this.counter++}`;
      };
    };

    jss.setup({ createGenerateId: <CreateGenerateId>createGenerateId });

    this.sheet = jss
      .createStyleSheet(
        {
          button: {
            width: 100,
            height: 100
          },
          content: {
            'flex-direction': (data) => data.content['flex-direction'],
            color: (data) => data.content.color
          },
          container: {
            // background: 'rgba(255, 0, 0, 0.2) !important',
            border: 'solid 1px #cfd8dc',
            'border-radius': '5px'
          }
        },{
          media: 'all',
          link: true
        }
      ).attach();

    this.sheet.update({
      button: {
        width: 100,
        height: 100
      },
      content: {
        'flex-direction': 'row',
        color: 'white'
      },
      container: {
        background: 'red !important',
        border: 'solid 1px black'
      }
    })

    this.renderer2.addClass(this.content.nativeElement, this.sheet.classes.content);
    this.renderer2.addClass(this.dragOne.nativeElement, this.sheet.classes.container);
    this.renderer2.addClass(this.dragTwo.nativeElement, this.sheet.classes.container);
  }

  public doLayoutRow(): void {
    // @ts-ignore
    const flexDirection: string = this.sheet.getRule('content').prop('flex-direction');
    console.log(flexDirection)
    this.sheet.update({
      button: {
        width: 100,
        height: 100
      },
      content: {
        'flex-direction': flexDirection === 'row' ? 'column' : 'row',
        color: 'white'
      },
      container: {
        background: 'red !important'
      }
    });
  }

  public doLayoutColor(): void {
    // @ts-ignore
    const color: string = this.sheet.getRule('content').prop('color');
    console.log(color);
    // @ts-ignore
    const flexDirection: string = this.sheet.getRule('content').prop('flex-direction');

    this.sheet.update({
      button: {
        width: 100,
        height: 100
      },
      content: {
        'flex-direction': flexDirection,
        color: 'black'
      },
      container: {
        background: 'blue !important'
      }
    });
  }


  private reduceDefaultStyles(path: string[], value: string | number): void {
    this.styles = assocPath(path, value, this.styles)
  }
}
