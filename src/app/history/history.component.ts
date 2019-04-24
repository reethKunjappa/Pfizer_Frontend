// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {

  public historyColHeader = [ 
    { 'headerName' : 'Actions', 'width' : '20%' },
    { 'headerName' : 'Action By', 'width' : '20%' },
    { 'headerName' : 'Action On', 'width' : '16%' },
    { 'headerName' : 'Description', 'width' : '44%' },
  ];
  public projectId : string;
  public auditHistoryList : any[] = [];
  public projectDetails : any;

  constructor( private activatedRoute : ActivatedRoute, private projectViewService : ProjectViewService ) { 
    this.activatedRoute.paramMap.subscribe((params : any) => {
      this.projectId = params.get('id');
      this.projectViewService.getProjectAuditHistory({ "project._id" : this.projectId }).subscribe(( projectAuditHistoryResp : any ) => {
        if ( projectAuditHistoryResp.status.code === 0 ) {
          this.auditHistoryList = projectAuditHistoryResp.result;
        }
      });
      
      this.projectViewService.openProject(this.projectId).subscribe(( viewProjectResponse : any ) => {
        if ( viewProjectResponse != undefined && viewProjectResponse != "" ) {
          this.projectDetails = viewProjectResponse;
        }
      });

    });
  }

  ngOnInit() {}

}
