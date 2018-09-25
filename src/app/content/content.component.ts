import { Component, OnInit, Injectable,ViewChild,Input} from '@angular/core';
import { CropperComponent } from '../cropper/cropper.component';
import { AppComponent } from '../app.component';
import { Media } from '../models/media';
declare var $: any;
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
  Column: number = 8;
  myDropzone : any;
  WidthIem = 100 / this.Column + "%";
  public_path : string = "";
  is_loading : boolean = false;
  @ViewChild(CropperComponent) Cropper : CropperComponent;
  constructor(
    private app : AppComponent
  ) { 
    
  }
  OnchangeFile ($file : Media){
    this.app.file = $file; 
    
  }
  addItemContent ($file) {
    this.app.CurrentFiles.join($file);
  }
  cropperData (){
    this.Cropper.cropperDataFile();
    return false;
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
    }
    setTimeout(() => {
      this.public_path = this.app.config.BASE['public_path'];
    },1000);
  }
}
