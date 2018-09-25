
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Folder } from '../models/folder';
import {Service} from '../models/service';
import { Observable, of } from 'rxjs';
import { } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FolderService {
  constructor(private http: HttpClient) { }
  add (url : string ,file : Folder) : Observable<Folder>{
    return this.http.post<Folder>(url,file) ;
  }
}
