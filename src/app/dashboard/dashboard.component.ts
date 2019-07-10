// Dependency Imports
import { Component, OnInit } from '@angular/core';

// Service Imports
import { LoggedInUserService } from '../services/logged-in-user.service';
import { ProjectViewService } from '../services/project-view.service';

// Component Imports
import { ChartJsComponent } from '../chart-js/chart-js.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public typeOfCharts: any[] = ['doughnut', 'bar', 'line', 'pie', 'radar', 'polarArea'];
  public chart1: string;
  public chart2: string;
  public refreshChart: string = "";

  // public documentsHeaderArray: any = ['Label', 'Reference', 'Previous Label', 'HA Guidelines', 'Pfizer Checklist', 'Font Format Spec'];
  public documentsHeaderArray: any[] = [];
  public documentsChartData: any[] = [
    { data: [], label: 'Documents Uploaded' },
  ];

  // public conflictHeaderArray: any[] = ['Content', 'Font', 'Spell Check', 'Order'];
  public conflictHeaderArray: any[] = [];
  public conflictChartData: any[] = [
    { data: [], label: 'Conflicts' },
  ];

  public dashboardStatics: any = {};

  constructor(private projectViewService: ProjectViewService, private loggedInUserService: LoggedInUserService) {
    this.chart1 = this.chart2 = this.typeOfCharts[0];
    this.initialize();
  }

  initialize() {
    this.projectViewService.fetchDashboardStatisticData(this.loggedInUserService.getNativeWindowRef()).subscribe((dashboardData: any) => {
      if (dashboardData != undefined && dashboardData != null && dashboardData != "") {
        this.dashboardStatics = dashboardData.result;
        this.dashboardStatics.documentsTypeCount.map((e) => {
          if ( e._id !== null && e._id !== undefined && e._id !== "" ) {
            this.documentsHeaderArray.push(e._id);
            this.documentsChartData[0].data.push(e.count);              
          }
        });

        this.dashboardStatics.conflictTypeCount.map((e) => {
          if ( e._id !== null && e._id !== undefined && e._id !== "" ) {
            this.conflictHeaderArray.push(e._id);
            this.conflictChartData[0].data.push(e.count);              
          }
        });

        // this.chart1 = this.typeOfCharts[0];
        // this.chart2 = this.typeOfCharts[0];
        this.refreshChart = "YES";
      }
    });
  }

  ngOnInit() { }
}
