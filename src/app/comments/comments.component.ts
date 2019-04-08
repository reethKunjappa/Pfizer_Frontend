import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public projectDetails = {};
  public commentsList = [
    {
      'commentedBy': { 'name': 'XYZ' },
      'commentedOn': '2019-03-27T10:08:01.823Z',
      'comment': 'sdklfj ksldjf klsdfj k jfsdklfj klsdfj skldfj klsdfj slkdfj sdlkfj '
    },
    {
      'commentedBy': { 'name': 'XYZ' },
      'commentedOn': '2019-03-27T10:08:01.823Z',
      'comment': 'sdklfj ksldjf klsdfj k jfsdklfj klsdfj skldfj klsdfj slkdfj sdlkfj '
    },
    {
      'commentedBy': { 'name': 'XYZ' },
      'commentedOn': '2019-03-27T10:08:01.823Z',
      'comment': 'sdklfj ksldjf klsdfj k jfsdklfj klsdfj skldfj klsdfj slkdfj sdlkfj '
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
