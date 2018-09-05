import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../models/media';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-file',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() file: Media;
  Config: any;
  ImageExe: any = null;
  constructor(
    private app: AppComponent
  ) {

  }

  ngOnInit() {
    this.Config = this.app.config;
    this.ImageExe = (this.Config.EXT['image']);
    
  }

}
