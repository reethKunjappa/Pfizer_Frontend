// Dependency Imports
import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChartJsComponent implements OnInit, OnChanges {

  // ng2-charts-x : Bar chart
  public defineChartType: string;
  public defineChartOptions: any = {};
  public defineChartLabels: any[] = [];
  public defineChartLegend: boolean = false;
  public defineChartData: any[] = [];

  // @Input Import Attributes
  @Input('chartTypes') chartTypes: string;
  @Input('scaleShowVerticalLines') scaleShowVerticalLines: any;
  @Input('responsive') responsive: any;
  @Input('maintainAspectRatio') maintainAspectRatio: any;
  @Input('legendDisplay') legendDisplay: any;
  @Input('legendLabelColor') legendLabelColor: any;
  @Input('xAxisGridLinesDisplay') xAxisGridLinesDisplay: any;
  @Input('yAxisGridLinesDisplay') yAxisGridLinesDisplay: any;
  @Input('xAxisLabelShow') xAxisLabelShow: any;
  @Input('yAxisLabelShow') yAxisLabelShow: any;
  @Input('xAxisLabelString') xAxisLabelString: any;
  @Input('yAxisLabelString') yAxisLabelString: any;
  @Input('xAxisLabelColor') xAxisLabelColor: any;
  @Input('yAxisLabelColor') yAxisLabelColor: any;
  @Input('xAxisDataLabelColor') xAxisDataLabelColor: any;
  @Input('yAxisDataLabelColor') yAxisDataLabelColor: any;
  @Input('offsetGridLines') offsetGridLines: any;
  @Input('headerLabelArray') headerLabelArray: any;
  @Input('chartData') chartData: any;

  constructor() { }

  ngOnInit() {
    this.initializeChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("changes:",changes);
    if ( changes['chartTypes'] && changes['chartTypes'].currentValue != undefined ) {
      this.chartTypes = changes['chartTypes'].currentValue;
      this.initializeChart();
    }

    if ( changes['chartData'] && changes['chartData'].currentValue ) {
      this.chartData = changes['chartData'].currentValue;
      // console.log("Change in chartData:",this.chartData);
      this.initializeChart();
    }

  }

  initializeChart() {
    this.defineChartType = this.chartTypes ? this.chartTypes : 'bar';
    this.defineChartOptions = {
      scaleShowVerticalLines: this.scaleShowVerticalLines ? this.scaleShowVerticalLines : false,
      responsive: this.responsive ? this.responsive : false,
      maintainAspectRatio: this.maintainAspectRatio ? this.maintainAspectRatio : true,

      // Below code for Displaying Chart Title - needs to configured and exposed  to parent component through selector
      // title: {
      //   display: true,
      //   text: 'Your chart title',
      //   fontColor: 'black',  // chart title color (can be hexadecimal too)
      // },

      legend: {
        display: this.legendDisplay ? this.legendDisplay : true,
        labels: {
          fontColor: this.legendLabelColor ? this.legendLabelColor : 'black', // legend color (can be hexadecimal too)
        },
      },

      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        xAxes: [{
          gridLines: {
            display: this.xAxisGridLinesDisplay ? this.xAxisGridLinesDisplay : false,
          },
          scaleLabel: {
            display: this.xAxisLabelShow ? this.xAxisLabelShow : true,
            labelString: this.xAxisLabelString ? this.xAxisLabelString : '',
            fontColor: this.xAxisLabelColor ? this.xAxisLabelColor : 'black',  // y axe label color (can be hexadecimal too)
          },
          ticks: {
            fontColor: this.xAxisDataLabelColor ? this.xAxisDataLabelColor : "black",
            // fontSize: 18,
            // stepSize: 1,
            // beginAtZero: true
          }
        }],
        yAxes: [{
          gridLines: {
            display: this.yAxisGridLinesDisplay ? this.yAxisGridLinesDisplay : false
          },
          scaleLabel: {
            display: this.xAxisLabelShow ? this.xAxisLabelShow : true,
            labelString: this.yAxisLabelString ? this.yAxisLabelString : '',
            fontColor: this.yAxisLabelColor ? this.yAxisLabelColor : 'black',  // y axe label color (can be hexadecimal too)
          },
          ticks: {
            fontColor: this.yAxisDataLabelColor ? this.yAxisDataLabelColor : "black",
          }
        }],
        gridLines: {
          offsetGridLines: this.offsetGridLines ? this.offsetGridLines : false
        },
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    // this.defineChartLabels = ['Label', 'Reference', 'Previous Label', 'HA Guidelines', 'Pfizer Checklist', 'Font Format Spec'];
    this.defineChartLabels = this.headerLabelArray;
    this.defineChartLegend = true;
    this.defineChartData = this.chartData;
    // this.defineChartData = [
    //   {
    //     data: [102, 555, 45, 966, 150, 340],
    //     label: 'Documents Uploaded',
    //     // datasets : [{
    //     //   labelColor: "#fff",
    //     //   fontColor: "#fff",
    //     //   color : '#fff',
    //     //   backgroundColor: "#fff",
    //     //   borderColor: "#fff",
    //     //   pointBackgroundColor: "#fff",
    //     //   pointBorderColor: "#fff",
    //     //   fill: false
    //     // }] 
    //   },
    //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    // ];
  }

}
