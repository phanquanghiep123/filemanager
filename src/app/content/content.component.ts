import { Component, OnInit, Injectable, Output ,EventEmitter} from '@angular/core';
import { Media } from '../models/media';
declare var $: any;
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
  LisTFile: Media[];
  Column: number = 8;
  file : Media;
  WidthIem = 100 / this.Column + "%";
  @Output () cropperDataFile = new EventEmitter()
  constructor() { 
    
  }
  OnchangeFile ($file : Media){
    this.file = $file;
    $("#myModalViewFile").modal();
  }
  cropperData (){
    this.cropperDataFile.emit();
  }
  ngOnInit() {
    var width = window.innerWidth;
    var height = window.innerHeight
    if (width <= 420) {
      this.Column = 1;
    } else if (width > 420 && width <= 768) {
      this.Column = 3;
    }
    else if (width > 768 && width <= 1024) {
      this.Column = 5;
    }
    else if (width > 1024 && width <= 1366) {
      this.Column = 6;
    }
    else{
      this.Column = 8;
    }
    this.WidthIem = 100 / this.Column + "%";
    window.onresize = (event) => {
      width = window.innerWidth;
      height = window.innerHeight
      if (width <= 420) {
        this.Column = 1;
      } else if (width > 420 && width <= 768) {
        this.Column = 3;
      }
      else if (width > 768 && width <= 1024) {
        this.Column = 5;
      }
      else if (width > 1024 && width <= 1366) {
        this.Column = 6;
      }
      else{
        this.Column = 8;
      }
      this.WidthIem = 100 / this.Column + "%";
    };
  }
}
