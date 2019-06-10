// Dependency Imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

// Service Imports
import { LoggedInUserService } from './logged-in-user.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectViewService {

  public _initializeProjectId$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeProjectId = this._initializeProjectId$.asObservable();   // asObservable declarations for listening to the

  public _initializeMappingSpec$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeMappingSpec = this._initializeMappingSpec$.asObservable();   // asObservable declarations for listening to the

  public mappingFileData : any;
  // public loggedInUser: any = { 'email': 'a@a.aa', 'name': 'Shashank Honrao', 'userId' : 'SHonrao' };
  public loggedInUser : any = this.loggedInUserService.getNativeWindowRef();
  public endPointAddress : string = environment.serverUrl; //configuration based on environment

  // public endPointAddress : string = 'http://54.164.151.252:3005'; //Dev Server URL
  // public endPointAddress: string = 'http://3.90.245.202:3005'; //Sand box server URL

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept' : 'application/json',
      // 'Authorization': 'my-auth-token'
    })
  };

  public projectId : string = "";

  constructor(private http: HttpClient, private loggedInUserService : LoggedInUserService) {
  }

  // Setter Method for Maintaining Project Id 
  public projectID(v : any) {
    this.projectId = v._id;
  }

  fetchMappingFileData(){
    return this.mappingFileData;
  }

  // Create Project API Call
  createProject( createProjectData: any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/createProject';
    return this.http.post<any>(url,createProjectData,this.httpOptions)
    .pipe(
      map((response: any ) => {
        return response;
      }),
      // catchError(err => of([]))
    );
  }

  // Fetch All Project Details API Call
  fetchAllProjects( data : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/getProjects';
    return this.http.post<any>( url, data, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response.result;                
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Open Project Details API Call
  openProject(id : string) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/viewProject';
    return this.http.post<any>( url, { "_id" : id }, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response.result;                
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Fetch Favorite Projects API Call
  fetchFavoriteProjects( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/getFavorites';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response.result;                
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Mark Favorite API Call
  markFavorite( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/markFavorite';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;                
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Unmark Favorite API Call
  unMarkFavorite( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/unMarkFavorite';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;                
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  /* =========================== COMPARE SECTION =========================== */
  //Get Document
  getDocument( requestData ): Observable<any> {
    const url = this.endPointAddress + '/api/labelling/compare';
    const reqInput = {
      '_id': requestData
    }
    return this.http.post(url, reqInput, this.httpOptions).pipe(
      map((response: any) => {
        if ( response.status.code === 0 ) {
          return response;
        }
      })
    )
  }

  //getReferenceDocument()
  getReferenceDocument(requestData): Observable<any> {
    const url = this.endPointAddress + '';
    const reqInput = {
      '_id': requestData
    }
    return this.http.post(url, reqInput, this.httpOptions).pipe(
      map((response: any) => {
        if ( response.status.code === 0 ) {
          return response;
        }
      })
    )
  }

  //Accept Comment
  acceptComment( commentReq ): Observable<any> {
    const url = this.endPointAddress + '';
    return this.http.post(url, commentReq, this.httpOptions).pipe(
      map((response: any) => {
        if ( response.status.code === 0 ) {
          return response;
        }
      })
    )
  }

  //Reject Comment
  rejectComment( commentReq ): Observable<any> {
    const url = this.endPointAddress + '';
    return this.http.post(url, commentReq, this.httpOptions).pipe(
      map((response: any) => {
        if ( response.status.code === 0 ) {
          return response;
        }
      })
    )
  }

  // View Prooject Conflicts API
  viewProjectConflicts( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/viewConflictProject';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;                
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Comments Sections API's
  // Get All Comments API  
  getAllComments( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/getAllComments';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;                
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Add Comments API
  createComments( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/createComments';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;                
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Update Comment API Call
  updateComment( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/updateComments';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;                
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Delete Document API Call
  deleteDocument( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/deleteDocument';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;              
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Get Project Audit History API call
  getProjectAuditHistory( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/auditHistory';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;              
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Accept & Reject Document Comments API Call
  acceptRejectDocumentsComments( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/commentAck';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {

        }else {
          //throw new Error(response.status.message);
        }
        return response;
      }),
      // catchError(err => of([]))
    );
  }

  // getCheckListData
  // FETCH Checllist API CALL
  getCheckListData( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/checkList';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // GET MAPPING SPEC'S DATA 
  getMappingSpec( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/getMappingSpec';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;              
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // ADD ADMIN PREFERENCES DATA 
  addAdminPreferences( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/preferencesCreate';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;              
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }
  
  // ADD ADMIN PREFERENCES DATA 
  fetchAdminPreferences() : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/getAllPreferences';
    return this.http.post<any>( url, null, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;              
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }

  // UPDATE ADMIN PREFERENCE COUNTRY LANGUAGE 
  updateCountryLanguage( requestData : any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/updatePreference';
    return this.http.post<any>( url, requestData, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code === 0 ) {
          return response;              
        }else {
          throw new Error('Value expected!');  
        }
      }),
      // catchError(err => of([]))
    );
  }
  
}
