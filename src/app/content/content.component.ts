import { Component, OnInit ,Injectable,Input,EventEmitter,Output} from '@angular/core';
import {Medias} from '../models/medias';
@Injectable()
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() LisTFile : any;
  constructor() {
   // console.log(this.LisTFile);
  }
  ngOnInit() {
    console.log(this.LisTFile);

  }

}
