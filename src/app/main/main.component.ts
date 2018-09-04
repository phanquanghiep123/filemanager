import { Component, OnInit ,Input,ViewChild} from '@angular/core';
import {ContentComponent} from '../content/content.component';
import {Medias} from '../models/medias';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  LisTFile = ["sd","s","cvcavxcav"];
  @ViewChild(ContentComponent) ContentComponent;
  constructor() {

  }
  ngOnInit() {
  }
  onOpen ($data){
    this.LisTFile = $data;
    return false;
  }
}
