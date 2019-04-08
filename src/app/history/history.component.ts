import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public historyColHeader = [ 'Actions', 'Updated By', 'Updated On', 'Description' ];
  public projectDetails = {};

  public historyList = [
    {
      'action': 'Update',
      'updatedBy': {'name': 'XYZ'},
      'updatedOn': '2019-03-27T10:08:01.823Z',
      'description': 'Abcds dsknc kldslvn lksdvnkldvn lknvlk sdnlk'
    },
    {
      'action': 'Reupload',
      'updatedBy': {'name': 'XYZ'},
      'updatedOn': '2019-03-27T10:08:01.823Z',
      'description': 'Abcds dsknc kldslvn lksdvnkldvn lknvlk sdnlk'
    },
    {
      'action': 'Update',
      'updatedBy': {'name': 'XYZ'},
      'updatedOn': '2019-03-27T10:08:01.823Z',
      'description': 'Abcds dsknc kldslvn lksdvnkldvn lknvlk sdnlk'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
