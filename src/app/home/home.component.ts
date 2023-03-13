import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import jss, { CreateGenerateId, InsertionPoint, Rule, StyleSheet } from 'jss';
import preset from 'jss-preset-default';
import { nanoid } from 'nanoid';
import { ApexChart, ApexAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import html2canvas from 'html2canvas';
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

type StyleKeys = 'button' | 'container' | 'content';
type ExtendedRule = Record<'prop', (prop: string) => string>;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
  private static readonly THUMBUP_ICON: string =
    `<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
    `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
    `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>`;
  private readonly cssNanoId: string;
  private counter: number;
  protected sheet!: StyleSheet<StyleKeys>;
  protected chart: ApexChart = { type: 'line' };
  protected series: ApexAxisChartSeries = [{
    name: 'sales',
    data: [30,40,35,50,49,60,70,91,125]
  }];
  protected readonly title: ApexTitleSubtitle = { text: 'Test' };
  protected readonly gridListItems: number[] = [1, 2, 3, 4, 5, 6];
  protected cols: number = 1;
  protected rowHeight: string = 'fill';
  protected handsetPortrait: boolean = false;

  @ViewChild('dragA') private readonly dragOne!: ElementRef<HTMLDivElement>;
  @ViewChild('dragB') private readonly dragTwo!: ElementRef<HTMLDivElement>;
  @ViewChild('content') private readonly content!: ElementRef<InsertionPoint & HTMLDivElement>;
  @ViewChild('html2canvas') private readonly html2canvas!: ElementRef<HTMLDivElement>;

  // https://github.com/cssinjs/examples/blob/gh-pages/inline/app.js
  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly renderer2: Renderer2,
    private readonly httpClient: HttpClient,
    readonly iconRegistry: MatIconRegistry,
    readonly sanitizer: DomSanitizer,
  ) {
    this.counter = 0;
    this.cssNanoId = nanoid(7);

    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(HomeComponent.THUMBUP_ICON));
  }

  ngOnInit(): void {
    // this.breakpointObserver.observe("(max-width: 959px)").subscribe(console.log);
    this.breakpointObserver.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
    ]).subscribe((breakpointState: BreakpointState) => {
      const { breakpoints }: { breakpoints: Record<string, boolean>; } = breakpointState;

      console.log('###############');

      if(breakpoints[Breakpoints.TabletPortrait]) {
        this.cols = 3;
        this.rowHeight = '1:1';
      } else if(breakpoints[Breakpoints.TabletLandscape]) {
        this.cols = 6;
        this.rowHeight = '1:2';
      } else if(breakpoints[Breakpoints.HandsetPortrait]) {
        this.cols = 2;
        this.rowHeight = '2:1';
        this.handsetPortrait = true;
      } else if(breakpoints[Breakpoints.HandsetLandscape]) {
        this.cols = 3;
        this.rowHeight = '2:1';
      } else {
        this.cols = 3;
        this.rowHeight = '1:1';
        this.handsetPortrait = false;
      }

      console.log(this.cols);
      console.log(this.rowHeight);
      console.log(this.handsetPortrait);
    });
  }

  ngAfterViewInit(): void {
    this.jssSetup();

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
    });

    this.renderer2.addClass(this.content.nativeElement, this.sheet.classes.content);
    this.renderer2.addClass(this.dragOne.nativeElement, this.sheet.classes.container);
    this.renderer2.addClass(this.dragTwo.nativeElement, this.sheet.classes.container);
  }

  public doLayoutRow(): void {
    const contentRule: Rule = this.sheet.getRule('content');
    const flexDirection: string = (contentRule as unknown as ExtendedRule).prop('flex-direction');
    const color: string = (contentRule as unknown as ExtendedRule).prop('color');

    this.sheet.update({
      button: {
        width: 100,
        height: 100
      },
      content: {
        'flex-direction': (flexDirection === 'row') ? 'column' : 'row',
        color: color
      },
      container: {
        background: 'red !important'
      }
    });
  }

  public doLayoutColor(): void {
    const contentRule: Rule = this.sheet.getRule('content');
    const flexDirection: string = (contentRule as unknown as ExtendedRule).prop('flex-direction');
    const color: string = (contentRule as unknown as ExtendedRule).prop('color');

    this.sheet.update({
      button: {
        width: 100,
        height: 100
      },
      content: {
        'flex-direction': flexDirection,
        color: (color === 'black') ? 'white' : 'black'
      },
      container: {
        background: 'blue !important'
      }
    });
  }

  public open(): void {
    html2canvas(this.content.nativeElement, {
      backgroundColor: null,
    }).then((canvas: HTMLCanvasElement) => {
        this.html2canvas.nativeElement.appendChild(canvas);

        const base64image = canvas.toDataURL('image/png');
        // window.open(base64image , '_blank');
    });
  }

  private jssSetup(): void {
    const insertionPoint: InsertionPoint = this.content.nativeElement;

    jss.setup(preset());
    jss.setup({ insertionPoint });

    const createGenerateId: () => (rule: Rule, sheet: StyleSheet) => string = () => {
      return (rule: Rule, _sheet: StyleSheet) => {
        return `${this.cssNanoId}-${rule.key}-${this.counter++}`;
      };
    };

    jss.setup({ createGenerateId: <CreateGenerateId>createGenerateId });

    this.sheet = jss.createStyleSheet(
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
  }
}
