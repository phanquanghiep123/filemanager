import { Component, OnInit ,Input} from '@angular/core';
import { Media } from '../models/media';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  @Input () breadcrumbs:Media[]; 
  @Input () file : Media;
  constructor() { }

  ngOnInit() {
  }

}
