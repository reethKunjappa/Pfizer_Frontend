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
  @Input('documentCategory') documentCategory : string;
  @Input('searchText') searchText : string;
  @Input('showCloseButton') showCloseButton : boolean = false;
  @Input('setZoomInPercent') setZoomInPercent : number = 0;
  @Input('reload') reload : boolean = false;
  @Output() closeSideBarSection = new EventEmitter();
  @Output() onErrorStateMessage = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['url'] && changes['url'].currentValue != undefined && changes['url'].currentValue != "" && changes['url'].currentValue != null ) {
      this.url = changes['url'].currentValue;
      // this.pdfViewers.openUrl(changes['url'].currentValue);  // Commented because "reload" attribute implementation
      this.pdfViewers.setZoomInPercent( this.setZoomInPercent );
      this.pdfViewers.zoomPageHeight();
    }

    if ( changes['searchText'] && changes['searchText'].currentValue != undefined && changes['searchText'].currentValue != "" && changes['searchText'].currentValue != null ) {    
      this.searchText = changes['searchText'].currentValue;
      // this.pdfViewers.openUrl( this.url );  //Remove this line and re-open the below line if files get mismatched
      this.pdfViewers.search( this.searchText );
    }

    if( changes['reload'] && changes['reload'].currentValue != undefined ) {
      if( changes['reload'].currentValue === true ) this.pdfViewers.openUrl( this.url );
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

  onProgress( event : any ) {
    // event is in {loaded: 207484, total: undefined} format where loaded is bits. 
  }

  onError( event : any ) {
    event['documentCategory'] = this.documentCategory;
    this.onErrorStateMessage.emit(event);
  }

  onSearchStateDetect(event: any) {
    // onSearchStateDetect is returning numeric value ex: 0 or 3 etc when any text is passed on for searching.
  }

}
