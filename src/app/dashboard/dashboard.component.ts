// Dependency Imports
import { Component, OnInit } from '@angular/core';

// Component Imports
import { ChartJsComponent } from '../chart-js/chart-js.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public typeOfCharts: any[] = ['bar', 'line', 'pie', 'doughnut', 'radar', 'polarArea'];
  public chart1 : string;
  public chart2 : string;

  public chartTypes: string = 'bar';
  public documentsHeaderArray: any = ['Label', 'Reference', 'Previous Label', 'HA Guidelines', 'Pfizer Checklist', 'Font Format Spec'];
  public documentsChartData: any[] = [
    { data: [102, 555, 45, 966, 150, 340], label: 'Documents Uploaded' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public demoArray: any[] = [
    { data: [10, 55, 145, 66, 950, 240], label: 'Series C' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series D' }
  ];

  public conflictHeaderArray: any[] = ['Content', 'Font', 'Spell Check', 'Order'];
  public conflictChartData: any[] = [
    { data: [0, 92, 22, 12], label: 'Conflicts' },
  ];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      // this.documentsChartData = [];
      this.demoArray.map((e) => {
        this.documentsChartData.push(e);
      });
    }, 2000);
  }

}
