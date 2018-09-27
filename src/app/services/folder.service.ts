import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../models/service';
import { Observable, of } from 'rxjs';
import { } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FolderService {
  controller = "downloads";
  httpOptions = {};
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "this.auth.get('token')"
      })
    };
  }
  add(url,folder) : Observable<Service>  {
    const f = new FormData ();
    for (var item in folder){
      f.append(item,folder[item]);
    }
    return this.http.post<Service>(url,f);
  }
  remove (url,id ) : Observable<Service>{
    const f = new FormData ();
    f.append("id",id);
    return this.http.post<Service>(url,f);
  }
}