import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  public project = {
    projectName : 'ABR',
    country: 'India',
    createdBy: 'Acd',
    createdOn: '10-Mar-2019',
    projectId: '1'
  }

  public documentTableHeaders = [ 'Document Name', 'Document Type', 'Uploaded By', 'Uploaded On'];

  public documentList = [
    {
      documentId : '001',
      documentName : 'Doc 1',
      documentType : 'Product One',
      uploadedBy : 'opekc',
      uploadedOn : '10-Mar-2019'
    },
    {
      documentId : '001',
      documentName : 'Doc 2',
      documentType : 'Product One',
      uploadedBy : 'kdslcm',
      uploadedOn : '10-Mar-2019'
    },
    {
      documentId : '001',
      documentName : 'Doc 3',
      documentType : 'Product One',
      uploadedBy : 'oidsjc',
      uploadedOn : '10-Mar-2019'
    },
    {
      documentId : '001',
      documentName : 'Doc 4',
      documentType : 'Product One',
      uploadedBy : 'ABC',
      uploadedOn : '10-Mar-2019'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
