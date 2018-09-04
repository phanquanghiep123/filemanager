
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Service} from '../models/service';
import { Observable, of } from 'rxjs';
import { } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TreesService {
  constructor(private http: HttpClient) {
  }
  gets($url): Observable<Service> {
    return this.http.get<Service>($url);
  }
}
