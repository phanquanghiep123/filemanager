import { Component } from '@angular/core';
import { Config } from './models/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'filemanager';
  constructor (private Config : Config){
 
  }
}
