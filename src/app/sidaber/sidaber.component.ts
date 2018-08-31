import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Config } from "../models/config";
import { ContentComponent } from '../content/content.component';
@Component({
  selector: 'app-sidaber',
  templateUrl: './sidaber.component.html',
  styleUrls: ['./sidaber.component.css']
})
export class SidaberComponent implements OnInit {
  jsTree: any;
  BindHtml : string = "";
  
  constructor
  (
    private Config: Config,
    private Content: ContentComponent,
  ) 
  {
   this.BindHtml ="<a href=\"#\" (click)=\alert('1')\">sdafs</a>";
  }
  ngOnInit() {
    
  }
  BindEvent() {
     
  }
}
