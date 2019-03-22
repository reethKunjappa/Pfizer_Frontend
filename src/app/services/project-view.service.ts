import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProjectViewService {

  public endPointAddress : string = 'http://192.168.0.18:5555';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept' : 'application/json',
      // 'Authorization': 'my-auth-token'
    })
  };
  
  constructor(private http: HttpClient) { }

  createProject( createProjectData: any ) : Observable<any> {
    let url = this.endPointAddress + '/api/labelling/createProject';
    console.log("Inside service",createProjectData, url);
    return this.http.post<any>(url,createProjectData,this.httpOptions)
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
