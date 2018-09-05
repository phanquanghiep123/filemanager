import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentComponent } from '../content/content.component';
import { SidaberComponent } from '../sidaber/sidaber.component';
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
