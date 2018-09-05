import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Service} from '../models/service';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient) {
  }
  public getFolder($url:string): Observable<Service>{
    return this.http.get<Service>($url);
  }
}
