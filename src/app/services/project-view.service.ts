import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectViewService {

  public _initializeProjectId$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeProjectId = this._initializeProjectId$.asObservable();   // asObservable declarations for listening to the

  // public endPointAddress : string = 'http://192.168.0.18:5555';
  public endPointAddress : string = 'http://localhost:5555';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept' : 'application/json',
      // 'Authorization': 'my-auth-token'
    })
  };

  public projectId : string = "";

  constructor(private http: HttpClient) { }

  // Setter Method for Maintaining Project Id 
  public projectID(v : any) {
    this.projectId = v._id;
  }

  // Create Project API Call
  createProject( createProjectData: any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/createProject';
    return this.http.post<any>(url,createProjectData,this.httpOptions)
    .pipe(
      map((response: any ) => {
        if ( response.status.code == '0' ) {
          return response;                
        }else {
          alert(response.status.message);
          throw new Error(response.status.message);
        }
      }),
      // catchError(err => of([]))
    );
  }

  // Fetch All Project Details API Call
  fetchAllProjects() : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/getProjects';
    return this.http.post<any>( url, null, this.httpOptions)
    .pipe(
      map((response: any )=> {
        if ( response.status.code == '0' ) {
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
        if ( response.status.code == '0' ) {
          return response.result;                
        }else {
          throw new Error('Value expected!');
        }
      }),
      // catchError(err => of([]))
    );
  }


}
