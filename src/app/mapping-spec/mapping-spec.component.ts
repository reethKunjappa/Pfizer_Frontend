// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Service Imports
import { ProjectViewService } from '../services/project-view.service'

@Component({
  selector: 'app-mapping-spec',
  templateUrl: './mapping-spec.component.html',
  styleUrls: ['./mapping-spec.component.css']
})

export class MappingSpecComponent implements OnInit {

  // Property Declarations
  public projectId: string;
  public projectTableHeaders: any[] = [
    { 'headerName': 'Label', 'class': '', 'width': '40%' },
    { 'headerName': 'Predicted Section', 'class': '', 'width': '40%' },
    // { 'headerName': 'Actual Section', 'class': '', 'width' : '30%' },
    { 'headerName': 'Similarity Score (%)', 'class': '', 'width': '20%' }
  ];
  public fileData: any;
  public mappingSpec: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private projectViewService: ProjectViewService) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.projectId = params.get('id');
    });    

    this.fileData = this.projectViewService.fetchMappingFileData();
    // this.fileData = JSON.parse(localStorage.getItem('mappingData'));
    if( this.fileData ) {
      this.projectViewService.getMappingSpec(this.fileData).subscribe((getMappingSpecResp: any) => {
        this.mappingSpec = JSON.parse(getMappingSpecResp.result);
      });  
    }
  }

  ngOnInit() { }
  
  convertToPercent(value: any) {
    return Math.floor(parseInt(value)); //+ '%';
  }

}
