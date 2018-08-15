import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InitService {
  httpOptions;
  constructor(private http: HttpClient) {
  }
  public getJSON(): Observable<any>{
    return this.http.get("configs/init.json");
  }
}
