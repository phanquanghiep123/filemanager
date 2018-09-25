import { Component, OnInit ,Input} from '@angular/core';
import { Trees } from '../models/trees';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  @Input () breadcrumbs:Trees[]; 
  @Input () file : any;
  constructor() { }

  ngOnInit() {
  }

}
