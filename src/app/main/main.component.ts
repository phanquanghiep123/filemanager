import { Component, OnInit ,Input,ViewChild} from '@angular/core';
import {ContentComponent} from '../content/content.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild(ContentComponent) Content : ContentComponent;
  constructor() {
  }
  ngOnInit() {
  }
 
}
