import { Component, OnInit, Injectable, Input, EventEmitter, Output } from '@angular/core';
import { Media } from '../models/media';
@Injectable()
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
  LisTFile: [Media];
  Column: number = 8;
  WidthIem = 100 / this.Column + "%";
  constructor() {
    
  }
  ngOnInit() {
    var width = window.innerWidth;
    var height = window.innerHeight
    if (width > 1365) {
      this.Column = 8;
    } else if (width > 1023) {
      this.Column = 6;
    }
    else if (width > 767) {
      this.Column = 4;
    }
    else if (width > 639) {
      this.Column = 2;
    }
    else if (width < 419) {
      this.Column = 1;
    }
    this.WidthIem = 100 / this.Column + "%";
    window.onresize = (event) => {
      width = window.innerWidth;
      height = window.innerHeight
      if (width > 1365) {
        this.Column = 8;
      } else if (width > 1023) {
        this.Column = 6;
      }
      else if (width > 767) {
        this.Column = 4;
      }
      else if (width > 639) {
        this.Column = 2;
      }
      else if (width < 419) {
        this.Column = 1;
      }
      this.WidthIem = 100 / this.Column + "%";
    };
  }
}
