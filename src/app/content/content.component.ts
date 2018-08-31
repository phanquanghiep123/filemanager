import { Component, OnInit ,Injectable} from '@angular/core';
@Injectable()
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  LisTFile = [];
  constructor() {

  }
  ngOnInit() {

  }

}
