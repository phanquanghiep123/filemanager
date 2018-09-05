import { Component, OnInit, ElementRef } from '@angular/core';
import { SidaberComponent } from '../sidaber/sidaber.component';
import { Trees } from '../models/trees';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Trees[] = [];
  constructor(
    private SidaberComponent: SidaberComponent,
    private ElementRef: ElementRef

  ) {

  }
  ngOnInit() {
    var root = new Trees();
    root.id = 0;
    root.name = "Root";
    this.breadcrumbs.push(root);
  }
  ClickItem($item: Trees) {
    var a = document.querySelector(".a-node-"+$item.id+"");
     
  }
}
