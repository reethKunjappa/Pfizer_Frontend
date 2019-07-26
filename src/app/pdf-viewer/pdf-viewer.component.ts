// Dependency Imports
import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';

// Module Imports
import { SimplePdfViewerComponent } from 'simple-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit, OnChanges {

  // Property Declarations
  @ViewChild(SimplePdfViewerComponent) private pdfViewers: SimplePdfViewerComponent;
  @Input('url') url: string;
  @Input('searchText') searchText : string;
  @Input('showCloseButton') showCloseButton : boolean = false;
  @Input('setZoomInPercent') setZoomInPercent : number = 0;
  @Output() closeSideBarSection = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("Changes::", changes);   
    if ( changes['url'] && changes['url'].currentValue != undefined && changes['url'].currentValue != "" && changes['url'].currentValue != null ) {
      this.url = changes['url'].currentValue;
      this.pdfViewers.openUrl(changes['url'].currentValue);
    }

    if ( changes['searchText'] && changes['searchText'].currentValue != undefined && changes['searchText'].currentValue != "" && changes['searchText'].currentValue != null ) {    
      this.searchText = changes['searchText'].currentValue;
      this.pdfViewers.openUrl( this.url );  //Remove this line and re-open the below line if files get mismatched
      // this.pdfViewers.search( this.searchText );
    }

    if ( changes['setZoomInPercent'] && changes['setZoomInPercent'].currentValue != undefined ) {
      this.setZoomInPercent = changes['setZoomInPercent'].currentValue;
    }
  }

  closeSideBar() {
    this.closeSideBarSection.emit('Close');
  }

  // SIMPLE-PDF-VIEWER FUNCTIONALITIES
  onLoadComplete(){
    this.pdfViewers.search( this.searchText );
    this.pdfViewers.setZoomInPercent( this.setZoomInPercent );
    this.pdfViewers.zoomPageHeight();    
  }

  onProgress( event : any ) {}

  onError( event : any ) {}

  onSearchStateDetect(event: any) {}

}
